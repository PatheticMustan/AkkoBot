const { MessageEmbed } = require("discord.js");
const { prefix } = require("../config");
const config = require("../config");

module.exports = {
    name: "help",
    description: "Ask for help!",
    aliases: [],
    disabled: false,
    setup: (client) => {},
    run: (client, message, args) => {
        const owners = config.owners.map(v => `<@${v}>`).join("/");

        if (args.length === 0) {
            const helpEmbed = new MessageEmbed()
                .setColor(`#${config.color}`)
                .setTitle("AkkoBot Help")
                .setDescription("Help for the bot")
                .addField("Current prefix", config.prefix)
                .addField("Bot Commands", Array.from(client.commands.keys()).join(" | "))
                .addField("Found an issue?", `Please report any issues to ${owners}.`)
                .setTimestamp()
            message.channel.send(helpEmbed);
        } else {
            const alias = client.aliases.get(args[0]);
		    const command = client.commands.get(args[0]) || client.commands.get(alias);

		    if (command === undefined) return message.channel.send(`Could not find command "${args[0]}"`);

            const commandAliases = command?.aliases?.join(" | ") || "None";
            const commandUsage = (command?.usage)? `${prefix}${command?.usage}` : `Missing! Please report this to ${owners}`;

            const commandEmbed = new MessageEmbed().setColor(`#${config.color}`)
                .setTitle("Command Help")
                .setDescription(command?.description || "")
                .addField("Aliases", commandAliases)
                .addField("Usage",  commandUsage)
                .setTimestamp();

            message.channel.send(commandEmbed);
        }
    }
}