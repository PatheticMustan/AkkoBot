const user = require("../lib/user");

module.exports = {
    name: "eval",
    aliases: ["e"],
    setup: () => {},
    run: (client, message) => {
        message.reply("Nice try!");
    }
}