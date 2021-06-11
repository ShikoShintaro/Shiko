const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'nowPlaying',
  aliases: ['np'],
  description: 'Checks what is playing now',
  usage: "s!np",

  run : async(client, message, args) => {
    const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      new MessageEmbed()
        .setColor(config.colors.no)
        .setDescription("You must Join a voice channel before using this command!")
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setColor(config.colors.no)
        .setDescription("There are no songs playing in this server")
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Now Playing"
      )
      .setColor("BLUE")
      .setDescription(
        queue.queue[0].name +
          " Requested By: " +
          "<@" +
          queue.queue[0].requested +
          ">"
      )
      .setThumbnail(queue.queue[0].thumbnail)
      .setFooter("There are " + queue.queue.length + " songs in queue")
  );
  }
}