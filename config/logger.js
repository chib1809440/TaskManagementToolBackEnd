require('dotenv').config();
const { createLogger, format, transports } = require('winston')

const customLoggerFormatter = format.printf((info) => {
    if (info.level == 'error' && info.error) {
        return `[${info.timestamp}] [${info.level}] ${info.error.stack}\n${JSON.stringify(info.error, null, 4)}`;
    }
    return `[${info.timestamp}] [${info.level}] ${info.message}`
})

const logger = createLogger({
    transports: [
        new transports.File({
            level: process.env.LOG_LEVEL,
            format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }), customLoggerFormatter),
            filename: 'src/logs/combine.log',
        }),
        new transports.Console({
            level: process.env.LOG_LEVEL,
            format: format.combine(format.splat(), format.colorize(), format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }), customLoggerFormatter)
        }),
    ]
})

module.exports = logger