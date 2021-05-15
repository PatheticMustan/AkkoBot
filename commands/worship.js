module.exports = {
    name: "worship",
    description: "Worship your lord and savior Bobbu",
    aliases: ["hail"],
    disabled: false,
    setup: (client) => {},
    run: (client, message, args) => {
        const hailee = args.join(" ") || "Bobbu";
        message.channel.send(`All hail ${hailee}!`);
    }
}