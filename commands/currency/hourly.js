const { MessageEmbed, Message } = require("discord.js");
const CurrencySystem = require("currency-system")
const config = require("../../config/shiko.json");
const cs = new CurrencySystem;
const { Db } = require('mongodb')


/**
 * @param {Db} shikodb
 */
 
module.exports = {
    name: 'hourly',
    description: 'A way to earn money',
    category: 'Currency and Game',
    usage: "s!hourly",

    run : async (client, message, args, shikodb) => {
        let result = await cs.hourly({
            user: message.author,
            guild: message.guild,
            amount: 200,
        });
        if (result.error) 
            return message.channel.send ( new MessageEmbed()
                .setTitle('Woi Chill Down Fwend')
                .setDescription('You have used hourly recently Try again in\n' + `\`${result.time}\``)
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )
        else message.channel.send( new MessageEmbed()
            .setTitle('Yay~')
            .setDescription('You used **HOURLY** and now you have\n' + `\`${result.amount}\``)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )
    }
}