const { MessageEmbed, Discord, client } = require("discord.js");
const config = require('../../config/shiko.json')

module.exports = {
  name: 'loop',
  aliases: ['loop'],
  description: 'Loops a queue',
  usage: "s!loop",

  run : async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue)
      return message.channel.send(new MessageEmbed()
      .setTitle('Oi')
      .setDescription("There are no songs playing in this server")
      .setColor(config.colors.no)
      .setFooter(client.user.username, client.user.displayAvatarURL())
    )
  
    queue.loop = !queue.loop;
    message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Loop",
        )
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(
          "**Loop is" +
            (queue.loop == true ? " Enabled " : " Disabled ") +
          "for current song**"
        )
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );
  }
}