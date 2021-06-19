const CurrencySystem = require('currency-system');
const  Discord  = require('discord.js');


const cs = new CurrencySystem;

module.exports = {
    name: 'balance',
    description: 'Checks your current balance~',
    category: 'Curreny and Game',
    usage: 's!bal',
    aliases: ['bal'],

    run : async(client, message, args, shikodb) => {
        let user;

        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]).user;
            if (user) user = user.user;
        } else if (!args[0]) {
            user = message.author
        }

        let result = await cs.balance({
            user: user,
            guild: message.guild
        }) ; 
        message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Yahallooo~~', message.author.displayAvatarURL())
            .setTitle(user.tag)
            .addFields(
                {
                    name: '**Your wallet balance is...**',
                    value: `\`$${result.wallet}\`\n` + "**Current wallet balance**",
                    inline: true
                },
                {
                    name: '**And your bank balance is....**',
                    value: `\`$${result.bank}\`\n` + "**Current bank balance**",
                    inline: true
                }
            )
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )
    }
}
//`${user.tag}, \n have $${result.wallet} in you wallet and $${result.bank} in there bank.`