const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "listcomics",
    description: "Get the list of comics! Nice.",
    usage: "listcomics",
    aliases: ["lc"],
    disabled: false,
    setup: (client) => {},
    run: (client, message, args) => {
        fetch("https://www.bilibilicomics.com/twirp/comic.v1.Comic/GetSchedule?device=pc&platform=web", {
            "headers": {
                // for some reason it's empty if we don't include this line
                // who the fuck maintains the backend
                "content-type": "application/json;charset=UTF-8",
            },
            "body": JSON.stringify({day: new Date().getDay()}),
            "method": "POST"
        })
        .then(v => v.json())
        .then(comicsData => {
            let comics = comicsData.data.list; // .filter(comic => comic.is_today_update === true);
            let groups = {}

            if (comics.length === 0) return message.channel.send("There are no comics...??? Try again soon.");

            comics.map(comic => {
                // oh yeah, the ??= operator
                groups[comic.style[0]] = groups[comic.style[0]] || [];
                groups[comic.style[0]].push(comic.title);
            });
            
            console.log(groups);

            const ucEmbed = new MessageEmbed()
                .setTitle("Comics")
                .addField("", "[getting in my fucking ears](https://www.walmart.com/ip/Q-tips-Original-Cotton-Swabs-500-Count/10452580)")
                .addField("i love q tips so much",  "stupid fucking water [ahhhh](https://www.cvs.com/shop/q-tips-cotton-swabs-625-pack-prodid-1010416)\n[ehhhh](https://www.target.com/p/q-tips-cotton-swabs-625-ct/-/A-11223524)")
                .setColor("F00BA7")
                .setTimestamp()
        });
    }
}