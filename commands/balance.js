// at the top of your file
const Discord = require('discord.js');
const invite = 'https://discord.gg/6XyYM7NZ5T';
const user = require("../lib/user");
module.exports = {
    name: "balance",
    aliases: ["bal"],
    setup: () => {},
    run: (client, message) => {
        try{
          

        const balanceEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('💰Balance💰')
	.setAuthor(message.author.tag, message.author.avatarURL, invite)
	.setDescription(`${message.author.tag}'s Balance`)
	.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png')
	.addFields(
		{ name: 'Coins', value: `${user.getmoney(message.author.id,message)} coins` },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Messages', value:  `${user.getmsgs(message.author.id,message)} messages send`, inline: true },
		{ name: 'level', value:  `${user.getlevel(message.author.id,message)} `, inline: true },
	)
	.setTimestamp();
    message.channel.send(balanceEmbed);
    message.delete();
    }
    catch(e){
      
        message.channel.send("error: "+e);
    }
}
}