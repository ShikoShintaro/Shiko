const Discord = require('discord.js')

module.exports = {
    name: 'say',
    description: 'Says what you says',

    run: async (client, message, args) => {
        const msg = args.join(" ")
        

        message.channel.send(msg);
        

        let rolecheck;
        try {
            rolecheck = message.member.roles.color.hexColor
        } catch (e) {
            rolecheck = "#000000"
        }

        message.delete();

        switch (args[0]) {
            case "embed": {
                const msg2 = args.join(" ");
                const embed = new Discord.MessageEmbed()
                    .setDescription(msg2)

                message.channel.send(embed)

                message.delete();
            }
        }
    }
}