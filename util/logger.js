const winston = require("winston");

module.exports = client => {
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
            info: "white",
            verbose: "gray",
            debug: "orange"
        }
    }

    winston.addColors(customLevels.colors);

    global.tree = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: "combined.log" })
        ]
    });

    
}
