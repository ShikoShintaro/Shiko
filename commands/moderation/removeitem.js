const { MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system")
const config = require("../../config/shiko.json");
const cs = new CurrencySystem;
const { Db } = require('mongodb')

/**
 * @param {Db} shikodb
 */

module.exports = {
    name: 'removeitem',
    description: 'Removes an item from the shop',
    permissions: ['ADMINISTRATOR'],
    usage: 's!removeitem',

    run: async (client, message, args, shikodb) => {
        if (!args[0]) return message.channel.send(new MessageEmbed()
            .setTitle('Oi')
            .setDescription('Please Specify an item to remove')
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )
        let result = await cs.removeItem({
            guild: message.guild,
            item: parseInt(args[0])
        });
        if (result.error) {
            if (result.type == 'Invalid-Item-Number')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Oi')
                    .setDescription('Please enter the item number to remove!')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type == 'Unknown-Item')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Oi')
                    .setDescription('The item you mentioned to remove does not exist!')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
        } else 
            message.channel.send(new MessageEmbed()
                .setTitle('Done!')
                .setDescription('Done~ the item\n' + `\`${result.inventory.name}\`\n` + 'has been removed from the shop!')
                .setColor(config.colors.yes)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )
        
    }
}