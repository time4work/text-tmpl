const router = require('express').Router();
module.exports = router;

const bodyParser = require('body-parser');

const tmplRoutes = require('./tmpl_routes');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.use( bodyParser.json({limit: '500mb'}) );
router.use( bodyParser.urlencoded({ extended: true,limit: '500mb', parameterLimit:50000 }) );
router.use( tmplRoutes );

// module.exports = function(app, db) {
// 	tmplRoutes(app, db);
// };