const winston = require("winston");

const customLevels = {
    levels: { 
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        verbose: "gray"
    }
}

const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            level: "info"
        }),
        new winston.transports.File({
            filename: "combined.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple()
            ),
            level: "verbose"
        })
    ]
});

module.exports = logger;