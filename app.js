
const express = require('express');
const expressLogging = require('express-logging');

const port = process.env.PORT || 7070;

const db = require('./components/db');
const logger = require('./components/logger');
const routes = require('./routes');
const app = express();

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.set( 'env', 'development' );
// app.set( 'port', (process.env.PORT || port) );
app.use( expressLogging(logger) ) ;
app.use('/', routes);
app.listen(port, () => {
	logger.info('We are live on ' + port);
}); 
