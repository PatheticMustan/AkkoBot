const fetch = require("node-fetch");

module.exports = {
    name: "updatedcomics",
    description: "Get the list of comics updated today! Nice.",
    usage: "updatedcomics",
    aliases: ["uc"],
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
        .then(comics => {
            let updatedComics = comics.data.list

            if (updatedComics.length === 0) return message.channel.send("There were no updated comics today :(");
            
            message.channel.send(updatedComics);
        });
    }
}