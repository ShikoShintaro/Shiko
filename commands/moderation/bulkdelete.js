const { Discord, MessageEmbed, DMChannel } = require('discord.js');
const config = require('../../config/shiko.json');


module.exports = {
    name: "bulkdelete",
    description: "Deletes a specified amount of messages.",
    usage: "bulkdelete <amount>",
    detail: "`amount`: Amount of messages to delete. Must be in range of 2-100. [Integer]",
    permissions: ["MANAGE_MESSAGES"],
    aliases: ["bulk"],

    run: async (client, message, args) => {
        if (message.channel instanceof DMChannel) {
            return message.channel.send(new MessageEmbed()
                .setTitle('Sorry')
                .setDescription("❎ **| I'm sorry, this command is not available in DMs.**")
                .setColor(config.colors.no)
                .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        }

        const todelete = parseInt(args[0]);
        if (!todelete) {
            return message.channel.send(new MessageEmbed()
                .setTitle('OI!')
                .setDescription("❎ **| Hey, I don't know the amount of messages to delete!**")
                .setColor(config.colors.no)
                .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        }
        if (isNaN(todelete) || todelete < 2 || todelete > 100) {
            return message.channel.send(new MessageEmbed()
                .setTitle('Aweee~~')
                .setDescription("❎ **| I'm sorry, looks like the number of messages to delete is invalid. Must be in range of 2-100!**")
                .setColor(config.colors.no)
                .setFooter(client.user.username, client.user.displayAvatarURL())
            );
        }

        message.delete().then(() => {
            message.channel.bulkDelete(todelete).then(() => {
                const footer = config.avatar_list;
                const index = Math.floor(Math.random() * footer.length);
                const embed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
                    .setDescription("**Bulk delete executed**")
                    .setColor(config.colors.yes)
                    .setTimestamp(new Date())
                    .setFooter(client.user.username, footer[index])
                    .addField("Amount of messages", todelete);

                message.channel.send({ embed: embed }).then(msg => {
                    msg.delete({ timeout: 20000 });
                }).catch(console.error);
            });
        });

    }
};