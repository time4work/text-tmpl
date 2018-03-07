const fs = require('fs');
const path = require('path');
const join = require('path').join;


const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;


const logDir = '../log';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const moment = () => (new Date()).toLocaleTimeString();
const myFormat = printf(info => {
	// return `${moment()} [${info.label}] ${info.level}: ${info.message}`;
	return `${moment()} [${info.label}] ${info.level}: ${JSON.stringify(info.message, null, 4)}`;
});

const logger = createLogger({
	transports: [
		new (transports.Console)({ 
			format: format
				.combine( 
					format.json(),
					format.splat(),
					format.colorize(), 
					label({ label: 'sad' }),
    				timestamp(),
					myFormat,
				),
			json: true,
			humanReadableUnhandledException: true,
			level: 'info'
		}),
		new (transports.File)({
			filename: `${logDir}/debug.log`,
			timestamp: moment,
			level: 'debug'
		})
	]
});
module.exports = logger;


// var winston = require('winston');
// var logger = new (winston.Logger)({
//   levels: {
//     trace: 0,
//     input: 1,
//     verbose: 2,
//     prompt: 3,
//     debug: 4,
//     info: 5,
//     data: 6,
//     help: 7,
//     warn: 8,
//     error: 9
//   },
//   colors: {
//     trace: 'magenta',
//     input: 'grey',
//     verbose: 'cyan',
//     prompt: 'grey',
//     debug: 'blue',
//     info: 'green',
//     data: 'grey',
//     help: 'cyan',
//     warn: 'yellow',
//     error: 'red'
//   }
// });

// logger.add(winston.transports.Console, {
//   level: 'trace',
//   prettyPrint: true,
//   colorize: true,
//   silent: false,
//   timestamp: false
// });
