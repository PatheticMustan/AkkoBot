const config = require("../config");

module.exports = {
    name: "eval",
    aliases: ["e"],
    disabled: false,
    setup: () => {},
    run: (client, message, args) => {
        if (!config.owners.includes(message.author.id)) return message.channel.send("Only owners of the bot can run this command.");

        // eval it, and stringify
        const response = eval(args[0]) + "";
        if (response.length === 0) return message.channel.send("No result.");
        if (response.length > 2000) return message.channel.send(`Result is too big! (${response.length})`);

        return message.channel.send(response);
    }
}