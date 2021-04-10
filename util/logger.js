const winston = require("winston");

const customLevels = {
    levels: { 
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        verbose: "gray",
        debug: "orange"
    }
}

const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: "combined.log" })
    ]
});

module.exports = logger;