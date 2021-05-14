const { MessageEmbed } = require("discord.js");
const config = require("../config");

module.exports = {
    name: "help",
    description: "Ask for help!",
    aliases: [],
    disabled: false,
    setup: (client) => {
        let owners = config.owners.map(v => `<@${v}>`).join("/");
        client.helpEmbed = new MessageEmbed()
            .setColor("#10E64D")
            .setTitle("AkkoBot Help")
            .setDescription("Help for the bot")
            .addField("Current prefix", config.prefix)
            .addField("Bot Commands", Array.from(client.commands.keys()).join(" | "))
            .addField("Found an issue?", `Please report any issues to ${owners}.`)
            

    },
    run: (client, message) => {
        message.channel.send(client.helpEmbed.setTimestamp());
    }
}