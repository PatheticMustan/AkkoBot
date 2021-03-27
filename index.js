const { Discord, MessageEmbed, Collection, Client } = require("discord.js");
const fs = require("fs");

// env variables are auto-imported on replit, press the "run" button. 
require("dotenv").config()

const config = require("./config.js");
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

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

require("./util/load")(client);
require("./util/logger")(client);

tree.info("test");


for (const fileName of commandFiles) {
	const error = client.loadCommand(fileName);
	if (error) console.error(error);
}

for (const fileName of eventFiles) {
	const error = client.loadEvent(fileName);
	if (error) console.error(error);
}

// command handler
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
        
        if (command) command.run(client, msg, args);
    }
}

client.login(process.env.CLIENT_TOKEN);