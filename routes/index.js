const router = require('express').Router();
const logger = require('../components/logger');
module.exports = router;

const bodyParser = require('body-parser');

const tmplRoutes = require('./tmpl_routes');

router.use( bodyParser.json({limit: '500mb'}) );
router.use( bodyParser.urlencoded({ extended: true,limit: '500mb', parameterLimit:50000 }) );
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// console.log(req.body);	
	logger.info(req.body);
	next();
});
router.use( tmplRoutes );

// module.exports = function(app, db) {
// 	tmplRoutes(app, db);
// };