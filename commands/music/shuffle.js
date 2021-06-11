const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'shuffle',
  aliases: ['sf'],
  description: 'Shuffles the current queue',
  usage: "s!sf",

  run: async (client, message, args) => {
    const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(new MessageEmbed()
    .setTitle('Oi')
    .setDescription("You must Join a voice channel before using this command!")
    .setColor(config.colors.no)
  );
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Master Shuffle Controller Error"
        )
        .setDescription("**There are no songs in queue to shuffle**")
        .setColor(config.colors.no)
    );
  let songs = queue.queue;
  for (let i = songs.length - 1; i > 1; i--) {
    let j = 1 + Math.floor(Math.random() * i);
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.queue = songs;
  message.client.queue.set(message.guild.id, queue);
  message.channel
    .send(
      new MessageEmbed()
        .setAuthor(
          "Master Shuffle Controller"
        )
        .setDescription("** :white_check_mark: Shuffled the queue**")
        .setColor("BLUE")
    )
    .catch(console.error);
  }
}