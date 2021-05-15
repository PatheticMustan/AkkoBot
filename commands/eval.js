const config = require("../config");

module.exports = {
    name: "eval",
    description: "Evaluate arbitrary javascript! Only the bot owner can use this.",
    usage: `eval <code>`,
    aliases: ["e"],
    disabled: false,
    setup: () => {},
    run: (client, message, args) => {
        if (!config.owners.includes(message.author.id)) return message.channel.send("Only owners of the bot can run this command.");

        // eval it, and stringify
        let response = "";
        try {
            response = eval(args.join(" ")) + "";
        } catch (err) {
            response = err + "";
        }
        
        if (response.length === 0) return message.channel.send("No result.");
        if (response.length > 2000) return message.channel.send(`Result is too big! (${response.length})`);

        return message.channel.send(response);
    }
}