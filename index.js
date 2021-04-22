const { Discord, MessageEmbed, Collection, Client } = require("discord.js");
const fs = require("fs");
const user = require("./lib/user")
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

logger.info(`Loaded ${loadedEvents}/${eventFiles.length} commands` +
	(failedEvents? `, failed to load ${failedEvents} events` : ""));



// command handler, both on send, and on edit
client.on("message", async msg => handleCommand(msg));
client.on("messageUpdate", async msg => handleCommand(msg));

const handleCommand = async msg => {
	

	//Check if user is not a bot(we dont do bot storage)
	if(!msg.author.bot){
		//Experience System 
		if(!fs.existsSync(`./data/users/${msg.author.id}.json`)){		
			console.log('Generating user data for ' + msg.author.id)
			try{
				user.genuserdata(msg.author.id,msg);
			  }
			  catch(e){
				  msg.reply("Error generating data:\n " + e)
			  }
	
		}
else
{
	user.addusermsg(msg.author.id,msg);
	var msgs = user.getmsgs(msg.author.id,msg);
	if(msgs % 10 === 0){
		msg.reply("You earned 10 coins keep chatting :)");
		user.setmoney(msg.author.id,msg,user.getmoney(msg.author.id,msg) + 10);
	} 
}


		//Command Handler
	const text = msg.content;
	if (text.startsWith(prefix)) {
		// ?pet 00100000
		// commandName = "pet"
		// args = ["00100000"]
		const [commandName, ...args] = text.slice(prefix.length).split(" ");
		
		const alias = client.aliases.get(commandName);
		const command = client.commands.get(commandName) || client.commands.get(alias);
		
		try {
			command.run(client, msg, args);
		} catch (err) {
			logger.error(err);
			logger.verbose(err.stack);
		}
	}
	}
	else
	{

	}

	
}



client.login(process.env.CLIENT_TOKEN);