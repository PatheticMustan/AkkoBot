module.exports = {
    name: "balance",
    aliases: ["bal"],
    setup: () => {},
    run: (client, message) => {
        message.reply("$0.00! Poor!");
    }
}