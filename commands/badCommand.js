module.exports = {
    name: "throwerror",
    aliases: ["te"],
    disabled: true,
    setup: () => {},
    run: (client, message) => {
        throw new Error("Oh no!");
        message.reply("$0.00! Poor!");
    }
}