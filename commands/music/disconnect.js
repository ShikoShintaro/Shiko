const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'disconnect',
  aliases: ['dc', 'leave'],
  description: 'leaves the voice channel',
  usage: "s!dc",

  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel)
      return message.channel.send(new MessageEmbed()
        .setTitle('Oi')
        .setDescription("You must Join a voice channel before using this command!")
        .setColor(config.colors.no)
        .setFooter(client.user.username, client.user.displayAvatarURL())
      );


    await channel.leave();

    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Left the voice channel**")
        .setColor(config.colors.leave)
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );

  }
}