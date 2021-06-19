const { MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system")
const config = require("../../config/shiko.json");
const cs = new CurrencySystem;
const { Db } = require('mongodb')

/**
 * @param {Db} shikodb
 */

module.exports = {
    name: 'deposit',
    description: 'Deposit\'s your money~',
    category: 'Currency and Game',
    usage: 's!dep <amount>',
    aliases: ['dep'],

    run: async (client, message, args, shikodb) => {

        let money = args.join(" ");

        if (!money)
            return message.channel.send(new MessageEmbed()
                .setTitle('Awww~~')
                .setDescription('Pwease enter the amout you want to deposit~')
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )

        let result = await cs.deposite({
            user: message.author,
            guild: message.guild,
            amount: money
        });

        if (result.error) {
            if (result.type === 'money')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Awweee')
                    .setDescription('Pwese specify an amount to deposit~')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type === 'negative-money')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Awweee')
                    .setDescription('Pwese specify an amount to deposit~')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type === 'low-money')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Awweee')
                    .setDescription('You don\'t have that much money in your wallet xdd')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type === 'no-money')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Awweee')
                    .setDescription('You don\'t have that much money in your wallet xdd')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
        } else {
            if (result.type === 'all-success')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Yay~~~')
                    .setDescription('You have deposited all of your money in to your bank~')
                    .setColor(config.colors.yes)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type === 'success')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Yay~~')
                    .setDescription('You have deposited\n' + `\`$${result.amount}\`\n` + 'money to your bank~')
                    .setColor(config.colors.yes)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
        }
    }
}