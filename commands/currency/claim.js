
const { MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system")
const config = require("../../config/shiko.json");
const cs = new CurrencySystem;
const { Db } = require('mongodb')


/**
 * @param {Db} shikodb
 */

module.exports = {
    name: 'claim',
    description: 'Claims your daily points~',
    category: 'Currency and Game',
    aliases: ['daily'],

    run: async (client, message, args, shikodb) => {
        let result = await cs.daily({
            user: message.author,
            guild: message.guild,
            amount: 400,

        });
        if (result.error) return message.channel.send(new MessageEmbed()
            .setTitle('Aww~~~')
            .setDescription("You have used daily recently Try again in\n" + `\`${result.time}\``)
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        );
        else message.channel.send(new MessageEmbed()
            .setTitle('Yay~~~~')
            .setDescription("You have earned\n" + `\`${result.amount}\``)
            .setColor(config.colors.yes)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )
    }
}

//You have used daily recently Try again in ${result.time}
// You have earned $${result.amount}.