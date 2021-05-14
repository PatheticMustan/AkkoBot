const logger = require("./logger");

module.exports = client => {
    client.loadCommand = (fileName) => {
        try {
            const command = require(`../commands/${fileName}`);

            if (command.disabled) return true;
            if (client.used.has(command.name)) throw new Error(`Command already used in ${client.used.get(command.name)}.`);
            
            // this cleanliness is addicting, an almost ethereal state of existance
            client.commands.set(command.name, command);
            command?.setup?.(client);
            client.used.set(command.name, fileName);
            
            command?.aliases.forEach(alias => {
                if (client.used.has(alias)) logger.warn(`Alias (${alias}) in ${fileName} already used in ${client.used.get(alias)}.`);
                client.aliases.set(alias, command.name);
                client.used.set(alias, fileName)
            });
            
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