module.exports = {
    name: "throwerror",
    aliases: ["te"],
    setup: () => {},
    run: (client, message) => {
        throw new Error("Oh no!");
        message.reply("$0.00! Poor!");
    }
}