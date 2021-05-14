const logger = require("../util/logger");

module.exports = async (client) => {
    logger.info(`${client.user.username} is now online!`);

    setInterval(() => {
        client
            .guilds.cache.get("499669378414018570") // anime club
            .channels.cache.get("752059816427388928") // #main-chat
            .send("https://cdn.discordapp.com/attachments/719626899688521738/842784685670006865/unknown.png");
    }, 60*60*1000);
}
