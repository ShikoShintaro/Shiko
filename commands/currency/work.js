const Discord = require('discord.js')
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
const config = require('../../config/shiko.json')

module.exports = {
    name : 'work',
    description: 'Work and Earns money',
    usage: 's!work',

    run : async (client, message, args, msgArray, shikodb) => {
        let result = await cs.work({
            user: message.author,
            guild: message.guild,
            maxAmount: 700,
            replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
            cooldown: 1800
        });
        const embed = new Discord.MessageEmbed()
            .setTitle('oi you worked already')
            .setDescription('Pls work again in ' + result.time)
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())

        const embed1 = new Discord.MessageEmbed()
            .setTitle('yey~')
            .setDescription('Thank you for your hard senpai~ you earned ' + result.amount)
            .setColor(config.colors.yes)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        

        if (result.error) 
            return message.channel.send(embed)
        else 
            message.channel.send(embed1)
    } 
}