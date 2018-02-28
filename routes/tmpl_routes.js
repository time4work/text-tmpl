const router = require('express').Router();
module.exports = router;

router.post('/api/createtmpl', async (req, res) => {
	console.log('op');
	console.log(req.body);
	if(req.body.body.name)
		db.getDB((client)=>{
			var collection = client.collection('tmpls');
			console.log(collection);
			collection.insert({name: req.body.name}, function(err, result) {
				console.log(result);
				res.send({msg:'ok'});
			})
		})
	else console.log('sad');
});