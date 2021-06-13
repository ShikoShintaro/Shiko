const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'resume',
  aliases: ['rs'],
  description: 'Resumes the queue',
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
    let queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.channel.send(
        new MessageEmbed()
          .setDescription("There are no songs playing in this server")
          .setColor(config.colors.no)
          .setFooter(client.user.username, client.user.displayAvatarURL())
      );
    if (queue.playing == true)
      return message.channel.send(
        new MessageEmbed()
          .setDescription("The song is already playing")
          .setColor(config.colors.no)
          .setFooter(client.user.username, client.user.displayAvatarURL())
      );
    queue.connection.dispatcher.resume();
    message.react("▶");
    queue.playing = true;
    return message.channel.send(
      new MessageEmbed()
        .setDescription("**Resumed the music :white_check_mark:**")
        .setColor("BLUE")
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );
  }
}