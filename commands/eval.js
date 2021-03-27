module.exports = {
    name: "eval",
    aliases: ["e"],
    setup: () => {},
    run: (client, message) => {
        console.log(message.value);
    }
}