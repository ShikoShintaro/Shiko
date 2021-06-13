const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'skip',
  aliases: ['s'],
  description: 'skips a music from queue',
  usage: "s!s",

  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(new MessageEmbed()
    .setTitle('Oi')
    .setDescription("You must Join a voice channel before using this command!")
    .setColor(config.colors.no)
  );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription("There are no songs playing in this server")
        .setColor(config.colors.no)
    );
  queue.connection.dispatcher.end('skipped');
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Skipped the music**")
      .setColor("BLUE")
  );
  }
}