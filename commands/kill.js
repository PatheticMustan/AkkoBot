module.exports = {
    name: "kill",
    description: "Kill somebody!",
    usage: "kill <person>",
    aliases: [],
    disabled: false,
    setup: (client) => {
        this.testing = "Hello world!"
    },
    run: (client, message, args) => {
        const victim = args.join(" ") || "the sun";
        const weapons = [
            "a knife",
            "glue",
            "a bucket",
            "a pillow",
            "a Canadian goose",
            "the Thanksgiving turkey",
            "bread",
            "a cold fish"];
            
        message.channel.send(`You've killed ${victim} with ${weapons[Math.floor(weapons.length*Math.random())]}!`);
    }
}