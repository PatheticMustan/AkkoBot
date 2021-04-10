const logger = require("./logger");

module.exports = client => {
    client.loadCommand = (fileName) => {
        try {
            const command = require(`../commands/${fileName}`);
            
            // this cleanliness is addicting, an almost ethereal state of existance
            client.commands.set(command.name, command);
            command?.setup?.(client);
            command?.aliases.forEach(alias => client.aliases.set(alias, command.name));

            return true;
        } catch (err) {
            logger.error(`Unable to load command ${fileName}: ${err}`);
            logger.verbose(err.stack);
            return false;
        }
    }

    client.loadEvent = fileName => {
        try {
            const event = require(`../events/${fileName}`);

            // ugly, but it works!
            client.on(fileName.split('.')[0], async () => event(client));

            return true;
        } catch (err) {
            logger.error(`Unable to load event ${cmdFileName}: ${err}`);
            logger.verbose(err.stack);
            return false;
        }
    }
}