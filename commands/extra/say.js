const Discord = require('discord.js')

module.exports = {
    name : 'say',
    description: 'Says what you says',

    run : async(client, message, args) => {
        message.channel.send(args.join(" "));

        message.delete()
    }
}