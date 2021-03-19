module.exports = {
    name: "balance",
    aliases: ["bal"],
    setup: () => {console.log("set up hahah!")},
    run: (client, message) => {
        message.reply("$0.00! Poor!");
    }
}