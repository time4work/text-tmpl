const fs = require('fs');
const path = require('path');
const join = require('path').join;
const express = require('express');
const expressLogging = require('express-logging');

// logger
const winston = require('winston');
const logDir = 'log';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const moment = () => (new Date()).toLocaleTimeString();
const myConsoleFormat = winston.format.printf(function (info) {
	return `${info.level}[${moment()}]: ${info.message} `;
});
const logger = winston.createLogger({
	transports: [
		new (winston.transports.Console)({ 
			format: winston.format
				.combine( winston.format.colorize(), myConsoleFormat),
			humanReadableUnhandledException: true,
			level: 'info'
		}),
		new (winston.transports.File)({
			filename: `${logDir}/debug.log`,
			timestamp: moment,
			level: 'debug'
		})
	]
});

const port = process.env.PORT || 7070;
const db = require('./components/db');
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
