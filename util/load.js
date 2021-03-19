module.exports = (client) => {
    client.loadCommand = (cmdFileName) => {
        try {
            const command = require(`../commands/${cmdFileName}`);
            
            if (command.init) command.init(client);
            client.commands.set(command.name, command);
            if (command.aliases) command.aliases.forEach(alias => {
                client.aliases.set(alias, command.name);
            });
            return;
        } catch (err) {
            return `Unable to load command ${cmdFileName}: ${err}`;
        }
    };

    client.loadEvent = (eventFileName) => {
        try {
            const event = require(`../events/${eventFileName}`);
            const evtName = eventFileName.split('.')[0];
            client.on(evtName, event.bind(null, client));
            return;
        } catch (err) {
            return `Unable to load event ${eventFileName}: ${err}`;
        }
    };

    process.on('SIGTERM', async () => {
        await client.logger.log('SIGTERM signal received.');
        await client.logger.log('Bot shutting down...');
        await client.destroy(() => {
            client.logger.log('Bot has shut down.');
            process.exit(0);
        });
    });
    
    process.on('unhandledRejection', error => {
        console.error(error);
    });
};