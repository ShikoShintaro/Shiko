const ytdl = require("discord-ytdl-core");
const youtubeScraper = require("yt-search");
const yt = require("ytdl-core");
const { MessageEmbed, Util, MessageFlags } = require("discord.js");
const forHumans = require('../../util/forHumans');
const config = require("../../config/shiko.json")


var {
  getData,
  getPreview,
  getTracks
} = require("spotify-url-info");

const queue = new Map();

module.exports = {
  name: 'play',
  aliases: ['p',],
  description: 'Plays a music',
  usage: "s!p",

  run: async (client, message, args) => {
    const channel = message.member.voice.channel;

    const error = (err) => message.channel.send(err);
    const send = (content) => message.channel.send(content);
    const setqueue = (id, obj) => message.client.queue.set(id, obj);
    const deletequeue = (id) => message.client.queue.delete(id);
    var song;

    if (!channel) return error(new MessageEmbed()
      .setTitle('Oi')
      .setDescription("You must Join a voice channel to play a music!")
      .setColor(config.colors.no)
      .setFooter(client.user.username, client.user.displayAvatarURL())
    );

    if (!channel.permissionsFor(message.client.user).has("CONNECT"))
      return error("I don't have permission to join the voice channel");

    if (!channel.permissionsFor(message.client.user).has("SPEAK"))
      return error("I don't have permission to speak in the voice channel");

    const query = args.join(" ");

    if (!query) return error(new MessageEmbed()
      .setTitle('Oi')
      .setDescription("You didn't provide a song name to play!")
      .setColor(config.colors.no)
      .setFooter(client.user.username, client.user.displayAvatarURL())
    );

    if (query.includes("www.youtube.com")) {
      try {
        const ytdata = await await yt.getBasicInfo(query);
        if (!ytdata) return error(new MessageEmbed()
          .setTitle('Oi')
          .setDescription("No song found for the url provided")
          .setColor(config.colors.no)
          .setFooter(client.user.username, client.user.displayAvatarURL())
        )
      } catch (e) {
        console.log(e);
        return error("Error occured, Cannot Find/In Other words Youtube Playlist Is Not Supported (this feature will be added soon)");
      }
    } else {
      try {
        const fetched = await (await youtubeScraper(query)).videos;
        if (fetched.length === 0 || !fetched)
          return error(new MessageEmbed()
            .setTitle('Oi')
            .setDescription("I couldn't find the song you requested!")
            .setColor(config.colors.no)
            .setFooter(client.user.username, client.user.displayAvatarURL())
          );
        const data = fetched[0];
        song = {
          name: Util.escapeMarkdown(data.title),
          thumbnail: data.image,
          requested: message.author,
          videoId: data.videoId,
          duration: data.duration.toString(),
          url: data.url,
          views: data.views,
        };
      } catch (err) {
        console.log(err);
        return error("An error occured, Please check console");
      }
    }

    var list = message.client.queue.get(message.guild.id);

    if (list) {
      list.queue.push(song);
      return send(
        new MessageEmbed()
          .setAuthor(
            "The song has been added to the queue",
            "https://img.icons8.com/color/2x/cd--v3.gif"
          )
          .setColor("F93CCA")
          .setThumbnail(song.thumbnail)
          .addField("Song Name", song.name, false)
          .addField("Views", song.views, false)
          .addField("Duration", song.duration, false)
          .addField("Requested By", song.requested.tag, false)
          .setFooter("Positioned " + list.queue.length + " In the queue")
      );
    }

    const structure = {
      channel: message.channel,
      vc: channel,
      volume: 85,
      playing: true,
      queue: [],
      connection: null,
    };

    setqueue(message.guild.id, structure);
    structure.queue.push(song);

    try {
      const join = await channel.join();
      structure.connection = join;
      play(structure.queue[0]);
    } catch (e) {
      console.log(e);
      deletequeue(message.guild.id);
      return error("I couldn't join the voice channel, Please check console");
    }

    async function play(track) {
      try {
        const data = message.client.queue.get(message.guild.id);
        if (!track) {
          data.channel.send("Queue is empty, Leaving voice channel");
          message.guild.me.voice.channel.leave();
          return deletequeue(message.guild.id);
        }
        data.connection.on("disconnect", () => deletequeue(message.guild.id));
        const source = await ytdl(track.url, {
          filter: "audioonly",
          quality: "highestaudio",
          highWaterMark: 1 << 25,
          opusEncoded: true,
        });
        const player = data.connection
          .play(source, { type: "opus" })
          .on("finish", () => {
            var removed = data.queue.shift();
            if (data.loop == true) {
              data.queue.push(removed)
            }
            play(data.queue[0]);
          });
        player.setVolumeLogarithmic(data.volume / 100);
        data.channel.send(
          new MessageEmbed()
            .setAuthor(
              "Started Playing",
              "https://img.icons8.com/color/2x/cd--v3.gif"
            )
            .setColor("9D5CFF")
            .setThumbnail(track.thumbnail)
            .addField("Song Name", track.name, false)
            .addField("Views", track.views, false)
            .addField("Duration", track.duration, false)
            .addField("Requested By", track.requested, false)
            .setFooter(client.user.username, client.user.displayAvatarURL())
        );
      } catch (e) {
        console.error(e);
      }
    }
  }
}