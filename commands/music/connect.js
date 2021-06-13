const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'connect',
  aliases: ['join'],
  description: 'Joins a voice channel',
  usage: "s!join",

  run : async(client, message, args) => {

    const channel = message.member.voice.channel
    if (!channel)
      return message.channel.send(new MessageEmbed()
        .setTitle('Oi')
        .setDescription("You must Join a voice channel before using this command!")
        .setColor(config.colors.no)
        .setFooter(client.user.username, client.user.displayAvatarURL())
      );

    if (!channel.permissionsFor(message.client.user).has("CONNECT"))
      return message.channel.send(new MessageEmbed()
        .setTitle('Oi')
        .setDescription("I don't have permission to join the voice channel")
        .setColor(config.colors.no)
      );

    if (!channel.permissionsFor(message.client.user).has("SPEAK"))
      return message.channel.send(new MessageEmbed()
        .setTitle('Oi')
        .setDescription("I don't have permission to speak in the voice channel")
        .setColor(config.colors.no)
      );


    await channel.join();

    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Joined the voice channel**")
        .setColor(config.colors.join)
      );
  }
}