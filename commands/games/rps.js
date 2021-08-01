const Discord = require('discord.js')
const config = require("../../config/shiko.json")

module.exports = {
    name: 'RockPaperAndScissors',
    description: 'Just a Rock Paper And Scissors',
    aliases: ['rps'],
    usage: 's!rps',

    run: async (client, message, array, msgArray, shikodb) => {
        let embed = new Discord.MessageEmbed()
            .setTitle("RPS GAME")
            .setDescription("React to play!")
            .setTimestamp()
            .setColor("RANDOM")
            .setFooter(client.user.username, client.user.displayAvatarURL())
        let msg = await message.channel.send(embed)
        await msg.react("🗻")
        await msg.react("✂")
        await msg.react("📰")

        const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, { max: 1, time: 60000, error: ["time"] }).then(
            async (collected) => {
                const reaction = collected.first()
                let result = new Discord.MessageEmbed()
                    .setTitle("RESULT")
                    .addField("Your choice", `${reaction.emoji.name}`)
                    .addField("My choice", `${me}`)
                    .setTimestamp()
                    .setColor(config.colors.no)
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                await msg.edit(result)
                if ((me === "🗻" && reaction.emoji.name === "✂") ||
                    (me === "📰" && reaction.emoji.name === "🗻") ||
                    (me === "✂" && reaction.emoji.name === "📰")) {
                    message.reply(new Discord.MessageEmbed()
                        .setDescription(`${message.author}, You Lose`)
                        .setColor(config.colors.no)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                    );
                } else if (me === reaction.emoji.name) {
                    return message.reply(new Discord.MessageEmbed()
                        .setDescription(`${message.author}, Its a Tie!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                    );
                } else {
                    return message.reply(new Discord.MessageEmbed()
                        .setDescription(`${message.author}, You Won~`)
                        .setColor(config.colors.yes)
                        .setTimestamp()
                        .setFooter(client.user.username, client.user.displayAvatarURL())
                    );
                }
            })
            .catch(collected => {
                message.reply('Process has been cancelled since you did not respond in time!');
            })
    }
}