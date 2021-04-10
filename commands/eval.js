module.exports = {
    name: "eval",
    aliases: ["e"],
    setup: () => {},
    run: (client, message) => {
        logger.info(message.value);
    }
}