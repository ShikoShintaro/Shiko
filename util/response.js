const Discord = require('discord.js')



module.exports.run = (client, message, args) => {

    
    const Answer = [
        "Hmmm i dunno",
        "W-wha- NO!",
        "N-nande? are you curious?",
        "Yems~",
        "No",
        "Pretty sure....",
        "Definitely",
        "Im not sure..",
        "Sorry what? can you repeat it?",
        "I dont\'t know master~",
        "E-eh???"
    ]

    const randomIndex = Math.max(1, Math.floor(Math.random() * Answer.length));
    
    let answer = Answer[randomIndex]

    let rolecheck;
    try {
        rolecheck = message.member.roles.color.hexColor
    } catch (e) {
        rolecheck = "#000000"
    }

    const embed = new Discord.MessageEmbed()
        // .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
        .setColor(rolecheck)
        .setFooter("Shiko~")
        .setDescription(answer)



    message.channel.send(embed).catch(console.error);
   
    
}


module.exports.config = {
    name: 'response',
}