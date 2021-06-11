const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'pause',
  aliases: ['pause', 'TheWorld', 'TW'],
  description: 'Pauses the music',
  usage: "s!pause",

  run : async(client, message, args) => {
    const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      new MessageEmbed()
        .setDescription("You must Join a voice channel before using this command!")
        .setColor(config.colors.no)
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription("There are no songs playing in this server")
        .setColor(config.colors.no)
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );
  if (queue.playing == false)
    return message.channel.send(
      new MessageEmbed()
        .setDescription("The song is already paused")
        .setColor(config.colors.no)
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );
  queue.connection.dispatcher.pause();
  message.react("⏸");
  queue.playing = false;
  return message.channel.send(
    new MessageEmbed()
    .setDescription("**Paused the music :white_check_mark: **")
    .setColor("BLUE")
    .setFooter(client.user.username, client.user.displayAvatarURL())
  );
  }
}