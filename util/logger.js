module.exports = {
    levels: { 
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4
    },
    
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    })
}
