const { MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system")
const config = require("../../config/shiko.json");
const cs = new CurrencySystem;
const { Db } = require('mongodb')

/**
 * @param {Db} shikodb
 */

module.exports = {
    name: 'gamble',
    description: 'A game that makes your money loss (requires money)',
    usage: "s!gamble",
    category: 'Currency and Game',

    run: async (client, message, args, shikodb) => {

        let money = args.join(" ");

        if (isNaN(money))
            return message.channel.send(new MessageEmbed()
                .setTitle('Awww~~')
                .setDescription('Amount is not a number bwuh~')
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )

        let result = await cs.gamble({
            user: message.author,
            guild: message.guild,
            amount: money,
            minAmount: 700,
            cooldown: 15
        })
        if (result.error) {
            if (result.type == 'amount')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Awweee')
                    .setDescription('Please insert an amount first baka~')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type == 'nan')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Awweee')
                    .setDescription('The amount was not a number bakayaro')
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
                if (result.type == 'low-money')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Not enough money~')
                    .setDescription('You dont have enough money. You need\n' + `\`$${result.neededMoney}\`\n` + "To play again")
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type == 'gamble-limit')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Awweee')
                    .setDescription('You don\'t have enough money for gambling The minimun amout was\n' + `\`$${result.minAmount}\``)
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type == 'time')
                return message.channel.send(new MessageEmbed()
                    .setTitle('OI Youre too fast!!')
                    .setDescription('Woi woi you need to wait\n' + `\`${result.second}\`\n` + `before you can gamble again`)
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
        } else {
            if (result.type == 'lost')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Awweee you lost')
                    .setDescription('Oh no.... You lose\n' + `\`$${result.amount}\`\n` + 'You have\n' + `\`$${result.wallet}\`\n` + "left gamabaree~")
                    .setColor(config.colors.no)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
            if (result.type == 'won')
                return message.channel.send(new MessageEmbed()
                    .setTitle('Woi You won~')
                    .setDescription('YAY~ You won\n' + `\`$${result.amount}\`\n` + 'You have\n' + `\`$${result.wallet}\`\n` + 'now~ yay~~~')
                    .setColor(config.colors.yes)
                    .setTimestamp()
                    .setFooter(client.user.username, client.user.displayAvatarURL())
                )
        }
    }
}