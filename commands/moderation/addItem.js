const { MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system")
const config = require("../../config/shiko.json");
const cs = new CurrencySystem;
const { Db } = require('mongodb')

/**
 * @param {Db} shikodb
 */

module.exports = {
    name: 'additem',
    description: 'Adds an item to the shop',
    permissions: ['ADMINISTRATOR'],
    usage: 's!additem <itemname>',

    run: async (client, message, args, shikodb) => {
        const user = message.mentions.users.first() || message.author
        
        message.channel.send(new MessageEmbed()
            .setTitle('Add Item')
            .setDescription('What should be the name of the item?')
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        );
        let Name = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
            max: 1
        });

        message.channel.send(new MessageEmbed()
            .setTitle('Item Price')
            .setDescription('And What is the price of your item?')
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        );
        let Price = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
            max: 1
        });
        let result = await cs.addItem({
            guild: message.guild,
            inventory: {
                name: Name.first().content,
                price: parseInt(Price.first().content)
            }
        });
        if (result.error) {
            if (result.type == 'No-Inventory-Name') 
                return message.channel.send ( new MessageEmbed()
                    .setTitle('No Inventory name')
                    .setDescription('sowwy there was an error, Please enter item name to removadd')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type == 'Invalid-Inventory-Space')
                return message.channel.send( new MessageEmbed()
                    .setTitle('No inventory space')
                    .setDescription('oops~ there was an error, Invalid Price')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type == 'No-Inventory-Price')
                return message.channel.send(new MessageEmbed()
                    .setTitle('No Price')
                    .setDescription('oops~ there was an error, You didn\'t specify the price!')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type == 'No-Inventory')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Ooops~')
                    .setDescription('Sorry Im having problem receiving data from the data base! please try again!')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
        } else {
            message.channel.send( new MessageEmbed()
                .setTitle('Item Added~')
                .setDescription('Yay~ the item named `'  + Name.first().content + '`has been added to the shop!')
                .setColor(config.colors.yes)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )
        }
    }
}