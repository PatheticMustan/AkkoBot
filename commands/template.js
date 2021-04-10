module.exports = {
    name: "template",
    description: "template description",
    aliases: [],
    setup: (client) => {
        this.testing = "Hello world!"
    },
    run: (client, message) => {
        message.channel.send(this.testing);
    }
}