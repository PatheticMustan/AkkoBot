const logger = require("../util/logger");

module.exports = async (client) => {
    logger.info(`${client.user.username} is now online!`);
}
