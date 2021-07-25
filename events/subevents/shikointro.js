const Discord = require('discord.js')
const config = require('../../config/shiko.json')


module.exports.run = (client, message, args, msgArray, shikodb) => {
    const embed1 = new Discord.MessageEmbed()
        .setAuthor('Shiko Shintaro\'s Introduction', 'https://cdn.discordapp.com/attachments/867019849125068810/868860218409381908/unknown.png')
        .setDescription(`Shiko Shintaro is a vtuber who plays games who was freetime after her part time work as a Maid`)
        .addFields(
            {
                name: "Likes",
                value: "Coding, Drawing, Gaming, Animation, Spicy Foods, Voice Acting"
            },
            {
                name: "Dislikes",
                value: "Nothing Hehe~"
            },
            {
                name: "Favorites",
                value: "(almost all i guess? hehe)"
            },
            {
                name: "Zodiac Sign",
                value: "Virgo"
            },
            {
                name: "Birthday",
                value: "21 September",
            },
            {
                name: "Shiko's Story",
                value: "Shiko is a Part timer to earn money for her life after being abandoned by her family."
            }
        )
        .setColor(config.colors.no)
        .setTimestamp()
        .setFooter("Shiko Shintaro")
    
         message.channel.send(embed1) 
    
        let cmd = client.utils.get("intro")
        cmd.run(client, message, args, msgArray, shikodb)
    
}

module.exports.config = {
    name: "shikointro"
}