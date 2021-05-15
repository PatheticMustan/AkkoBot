module.exports = {
    name: "template",
    description: "template description",
    aliases: [],
    disabled: true,
    setup: (client) => {
        this.testing = "Hello world!"
    },
    run: (client, message, args) => {
        message.channel.send(this.testing);
    }
}