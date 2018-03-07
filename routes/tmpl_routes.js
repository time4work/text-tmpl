const router = require('express').Router();
const logger = require('../components/logger');
const db = require('../components/db');
module.exports = router;

router.get('/api/templates', async (req, res) => {
	console.log('op0');
	
	db.getCollection('tmpls', (collection)=>{
		collection.find().toArray((err, results)=>{
			console.log(results);
			res.send({list:results});
		});
	});
});

router.post('/api/createtmpl', async (req, res) => {
	console.log('op1');
	if(req.body.name)
		db.getCollection('tmpls', (collection)=>{
			collection.insert({name: req.body.name, keys: []}, function(err, result) {
				console.log(result);
				res.send({msg:'ok', ops:result.ops});
			})
		});
	else console.log('sad');
});

router.post('/api/template', async (req, res) => {
	console.log('op2');
	if(req.body.id){
		var id = new require('mongodb').ObjectID(req.body.id);
		db.getCollection('tmpls', (collection)=>{
			collection.findOne({"_id" : id})
			.then((tmpl)=>{
				console.log(tmpl);
		        if(!tmpl)
		            throw new Error('No record found.');
				res.send({obj:tmpl});
			});
		});
	}else console.log('sad');
});

router.post('/api/template/add-key', async (req, res) => {
	console.log('op3');
	var key = req.body;
	if(key){
		var id = new require('mongodb').ObjectID(key.tmpl);

		db.getCollection('tmpls', (collection)=>{
			collection.findOne({
				"_id" : id
			}).then((tmpl)=>{
		        if(!tmpl)
		            throw new Error('No record found.');
		        var new_id = tmpl.keys.length;

				db.getCollection('tmpls', (collection)=>{
					collection.updateOne({
						"_id" : id
					}, { 
						// "$set": {""} 
						"$push": {
					        keys: {
					        	"id": new_id,
					        	name: key.name,
					        	values: [],
					        }
				        }
					}).then((result)=>{
						console.log(result);
						if(result.result.ok) res.send({ 
							msg: 'ok',
							id: new_id,
							name: key.name
						});
					})
					.catch((e)=>{
						if(e) console.log(e);
					})
				});

			});
		});

	}else console.log('sad');
});

router.post('/api/template/key/add-value', async (req, res) => {
	console.log('op4');
	var tmplID = req.body.tmpl;
	var keyID = req.body.key;
	var value = req.body.value;
	if( tmplID && keyID!=NaN && value ){
		var id = new require('mongodb').ObjectID(tmplID);
		db.getCollection('tmpls', (collection)=>{
			collection.findOne({
				"_id": id,
			}).then((tmpl)=>{
		        if(!tmpl)
		            throw new Error('No record found.');

				var new_id = null;
				for(var i=0; i<tmpl.keys.length; i++){
					if( tmpl.keys[i].id == keyID ){
						new_id = tmpl.keys[i].values.length;
					}
				}
				if( new_id == null ) throw new Error('No record found.');

					db.getCollection('tmpls', (collection)=>{
						keyID = parseInt(keyID);
						collection.update({
							"_id" : id,
							"keys.id" : keyID
						}, { 
							"$push": {
						        "keys.$.values": {
						        	id: new_id,
						        	value: value,
						        }
					        }
						}).then((result)=>{
							// console.log(result);
							if(result.result.ok) res.send({ 
								msg: 'ok',
								id: new_id,
								value: value
							});
						})
						.catch((e)=>{
							if(e) console.log(e);
						})
					});

		    });
		});

	}else console.log('sad');
});
