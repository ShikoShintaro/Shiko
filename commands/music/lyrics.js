const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'lyrics',
  aliases: ['ls'],
  description: 'Search a lyrics for the current song',
  usage: "s!ls",

  run : async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel
      .send("There is nothing playing.")
      .catch(console.error);

  let lyrics = null;

  try {
    lyrics = await lyricsFinder(queue.queue[0].name, "");
    if (!lyrics) lyrics = `No lyrics found for ${queue.queue[0].name} :x:`;
  } catch (error) {
    lyrics = `No lyrics found for ${queue.queue[0].name} :x:`;
  }

  let lyricsEmbed = new MessageEmbed()
    .setAuthor(
      `Lyrics For ${queue.queue[0].name}`
    )
    .setDescription(lyrics)
    .setColor("BLUE")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL());

  if (lyricsEmbed.description.length >= 2048)
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return message.channel.send(lyricsEmbed).catch(console.error);
  }
}