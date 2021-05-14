const { Collection, Client } = require("discord.js");
const fs = require("fs");
// env variables are auto-imported on replit, press the "run" button. 
require("dotenv").config()

const config = require("./config.js");
const logger = require("./util/logger");
const { prefix } = config;


// mongod, the god almighty of data storage
// TODO

const client = new Client({
	disableMentions:  "everyone",
	messageCacheMaxSize: 500,
	messageCacheLifetime: 86400,
	messageSweepInterval: 86400
});

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

client.used = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

require("./util/load")(client);
client.logger = require("./util/logger");



// crisp, clean, lock!
const loadedCommands = commandFiles.map(fileName => client.loadCommand(fileName)).reduce((a, b) => a + b, 0),
	  failedCommands = commandFiles.length-loadedCommands;
	
const loadedEvents = eventFiles.map(fileName => client.loadEvent(fileName)).reduce((a, b) => a + b, 0),
	  failedEvents = eventFiles.length-loadedEvents;

// sure, the lines may be a bit verbose, but at least it looks nice!
logger.info(`Loaded ${loadedCommands}/${commandFiles.length} commands` +
	(failedCommands? `, failed to load ${failedCommands} commands` : ""));

logger.info(`Loaded ${loadedEvents}/${eventFiles.length} events` +
	(failedEvents? `, failed to load ${failedEvents} events` : ""));



// command handler, both on send, and on edit
client.on("message", async msg => handleCommand(msg));
client.on("messageUpdate", async msg => handleCommand(msg));

const handleCommand = async msg => {
	const text = msg.content;
	if (text.startsWith(prefix)) {
		// ?pet 00100000
		// commandName = "pet"
		// args = ["00100000"]
		const [commandName, ...args] = text.slice(prefix.length).split(" ");
		
		const alias = client.aliases.get(commandName);
		const command = client.commands.get(commandName) || client.commands.get(alias);

		if (command === undefined) return;

		try {
			command.run(client, msg, args);
		} catch (err) {
			logger.error(err);
			logger.verbose(err.stack);
		}
	}
}



client.login(process.env.CLIENT_TOKEN);