const Discord = require("discord.js")
const config = require("./config/shiko.json")
module.exports.formatDate = formatDate;
module.exports.promptMessage = promptMessage;
module.exports.embedbuilder = embedbuilder;
module.exports.errorbuilder = errorbuilder;
module.exports.customplaylistembed = customplaylistembed;
module.exports.lyricsEmbed = lyricsEmbed;
module.exports.playsongyes = playsongyes;
module.exports.curembed = curembed;
module.exports.delay = delay;
module.exports.getRandomInt = getRandomInt;
module.exports.QueueEmbed = QueueEmbed;
module.exports.check_if_dj = check_if_dj;

function check_if_dj(message, member) {
    if(!message) return false;
    var client = message.client;

    if (!member) member = message.member;
    var roleid = client.settings.get(message.guild.id, `djroles`)
    if (String(roleid) == "") return false;

    var isdj = false,
        string = "";

    for (let i = 0; i < roleid.length; i++) {
        if (!message.guild.roles.cache.get(roleid[i])) continue;
        if (member.roles.cache.has(roleid[i])) isdj = true;
        string += "<@&" + roleid[i] + "> | "
    }
    if (!isdj && !member.hasPermission("ADMINISTRATOR"))
        return string;
    else
        return false;
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US').format(date)
}
async function promptMessage(message, author, time, validReactions) {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
        .awaitReactions(filter, {
            max: 1,
            time: time
        })
        .then(collected => collected.first() && collected.first().emoji.name);
}

function embedbuilder(client, deletetime, message, color, title, description, thumbnail) {
    try {
        if (title.includes("filter") && title.includes("Adding")) {
            client.infos.set("global", Number(client.infos.get("global", "filters")) + 1, "filters");
        }
    } catch {}
    try {
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(message.author.tag, message.member.user.displayAvatarURL({
                dynamic: true
            }), "https://dc.musicium.eu")
            .setFooter(client.user.username + " | by: Shiko Shintaro", client.user.displayAvatarURL());
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (thumbnail) embed.setThumbnail(thumbnail)
        if (!deletetime || deletetime === undefined || deletetime === "null") {
            message.channel.send(embed)
                .then(msg => {
                    try {
                        if (msg.channel.type === "news")
                            msg.crosspost()
                    } catch (error) {
                        console.log(error)
                        errorbuilder(error.stack.toString().substr(0, 2000))
                    }
                })
            return;
        }
        return message.channel.send(embed).then(msg => msg.delete({
            timeout: deletetime
        }));
    } catch (error) {
        embedbuilder(client, 5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function errorbuilder(error) {
    console.log(error)
}

function QueueEmbed(client, queue) {
    try {
        let embeds = [];
        let k = 10;
        for (let i = 0; i < queue.songs.length; i += 10) {
            let qus = queue.songs;
            const current = qus.slice(i, k)
            let j = i;
            k += 10;
            const info = current.map((track) => `**${j++} -** [\`${track.name}\`](${track.url}) - \`${track.formattedDuration}\``).join("\n")
            const embed = new Discord.MessageEmbed()
                .setTitle("Server Queue")
                .setColor(config.colors.yes)
                .setDescription(`**Current Song - [\`${qus[0].name}\`](${qus[0].url})**\n\n${info}`)
                .setFooter(client.user.username + " | by: Shiko Shintaro", client.user.displayAvatarURL())
            embeds.push(embed);
        }
        return embeds;
    } catch (error) {
        console.log(error)
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function customplaylistembed(client, message, lyrics, song) {
    if (!lyrics) lyrics = "No Songs in the playlist!";
    try {
        let embeds = [];
        let k = 1000;
        for (let i = 0; i < lyrics.length; i += 1000) {
            const current = lyrics.slice(i, k);
            k += 1000;
            const embed = new Discord.MessageEmbed()
                .setTitle("Custom Playlist")
                .setColor(config.colors.yes)
                .setDescription(current)
            embeds.push(embed);
        }
        return embeds;
    } catch (error) {
        console.log(error)
        embedbuilder(client, 5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function lyricsEmbed(client, message, lyrics, song) {
    try {
        let embeds = [];
        let k = 1000;
        for (let i = 0; i < lyrics.length; i += 1000) {
            const current = lyrics.slice(i, k);
            k += 1000;
            const embed = new Discord.MessageEmbed()
                .setTitle("Lyrics - " + song.name)
                .setURL(song.url)
                .setThumbnail(song.thumbnail)
                .setColor(config.colors.yes)
                .setDescription(current)
            embeds.push(embed);
        }
        return embeds;
    } catch (error) {
        console.log(error)
        embedbuilder(client, 5000, message, "RED", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}
async function playsongyes(client, message, queue, song) {
    try {
        let djs = "";
        if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "not setup"
        else
            for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
                djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }

        let embed1 = new Discord.MessageEmbed()

            .setColor(config.colors.yes)
            .setTitle("🎶 Playing Song!")
            .setDescription(`Song: [\`${song.name}\`](${song.url})`)
            .addField("💡 Requested by:", `>>> ${song.user}`, true)
            .addField("⏱ Duration:", `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
            .addField("🌀 Queue:", `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
            .addField("🔊 Volume:", `>>> \`${queue.volume} %\``, true)
            .addField("♾ Loop:", `>>> ${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}`, true)
            .addField("↪️ Autoplay:", `>>> ${queue.autoplay ? "✅" : "❌"}`, true)
            .addField("❔ Download Song:", `>>> [\`Click here\`](${song.streamURL})`, true)
            .addField("❔ Filter:", `>>> \`${queue.filter || "❌"}\``, true)
            .addField("🎧 DJ-Role:", `>>> ${djs}`, true)
            .setFooter(client.user.username + " | by: Shiko Shintaro", client.user.displayAvatarURL())
            .setAuthor(message.author.tag, message.member.user.displayAvatarURL({
                dynamic: true
            }), "https://dc.musicium.eu")
            .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)

        var playingMessage = await message.channel.send(embed1)

        client.settings.set(message.guild.id, playingMessage.id, "playingembed")
        client.settings.set(message.guild.id, message.channel.id, "playingchannel")

        try {
            await playingMessage.react("⏭");
            await playingMessage.react("⏹");
            await playingMessage.react("🔉");
            await playingMessage.react("🔊");
            await playingMessage.react("⬅️");
            await playingMessage.react("➡️");
        } catch (error) {
            embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
            errorbuilder(error.stack.toString().substr(0, 2000))
            console.log(error);
        }
        const filter = (reaction, user) => ["⏭", "⏹", "🔉", "🔊", "⬅️", "➡️"].includes(reaction.emoji.id || reaction.emoji.name) && user.id !== message.client.user.id;

        var collector = await playingMessage.createReactionCollector(filter, {
            time: song.duration > 0 ? song.duration * 1000 : 600000
        });
        collector.on("collect", async (reaction, user) => {
            if (!queue) return;

            const member = reaction.message.guild.member(user);

            reaction.users.remove(user);

            if (!member.voice.channel) return embedbuilder(client, 3000, message, config.colors.no, "`" + message.author.tag + "`" + " You must join a Voice Channel")

            if (member.voice.channel.id !== member.guild.me.voice.channel.id) return embedbuilder(client, 3000, message, config.colors.no, "`" + message.author.tag + "`" + " You must join my Voice Channel")

            if (check_if_dj(reaction.message, member))
                return embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ You don\'t have permission for this Command! You need to have: ${check_if_dj(message)}`)

            switch (reaction.emoji.id || reaction.emoji.name) {
                case "⏭":
                    client.distube.skip(message);
                    embedbuilder(client, 3000, message, config.colors.yes, "SKIPPED!", `Skipped the song`)
                    try {
                        playingMessage.reactions.removeAll();
                    } catch {}

                    try {
                        playingMessage.delete({
                            timeout: client.ws.ping
                        });
                    } catch {}
                    break;

                case "⏹":
                    client.distube.stop(message);
                    try {
                        playingMessage.reactions.removeAll();
                    } catch {}
                    try {
                        playingMessage.delete({
                            timeout: client.ws.ping
                        });
                    } catch {}
                    embedbuilder(client, 3000, message, config.colors.no, "STOPPED!", `Left the channel`)
                    break;

                case "🔉":
                    await client.distube.setVolume(message, Number(queue.volume) - 10);
                    embedbuilder(client, 3000, message, config.colors.yes, "Volume!", `Reduced the Volume to \`${queue.volume}\``)
                    break;

                case "🔊":
                    await client.distube.setVolume(message, Number(queue.volume) + 10);
                    embedbuilder(client, 3000, message, config.colors.yes, "Volume!", `Raised the Volume to \`${queue.volume}\``)
                    break;

                case "⬅️":
                    let seektime = queue.currentTime - 10000;
                    if (seektime < 0) seektime = 0;
                    await client.distube.seek(message, Number(seektime));

                    embedbuilder(client, 3000, message, config.colors.yes, "Seeked!", `Seeked the song for \`-10 seconds\``)
                    break;

                case "➡️":
                    let seektime2 = queue.currentTime + 10000;
                    if (seektime2 >= queue.songs[0].duration * 1000) {
                        seektime2 = queue.songs[0].duration * 1000 - 1;
                    }
                    await client.distube.seek(message, seektime2);

                    embedbuilder(client, 3000, message, config.colors.yes, "Seeked!", `Seeked the song for \`+10 seconds\``)
                    break;
                default:
                    break;
            }
        });
        collector.on("end", () => {
            playingMessage.reactions.removeAll();
            playingMessage.delete({
                timeout: client.ws.ping
            });
        })
    } catch (error) {
        console.log(error)
        embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function curembed(client, message) {
    try {
        let djs = "";
        if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "not setup"
        else
            for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
                djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }

        let queue = client.distube.getQueue(message); 
        let song = queue.songs[0];
        embed = new Discord.MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle("🎶 Playing Song:")
            .setDescription(`> [\`${song.name}\`](${song.url})`)
            .addField("💡 Requested by:", `>>> ${song.user}`, true)
            .addField("⏱ Duration:", `>>> \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
            .addField("🌀 Queue:", `>>> \`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
            .addField("🔊 Volume:", `>>> \`${queue.volume} %\``, true)
            .addField("♾ Loop:", `>>> ${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}`, true)
            .addField("↪️ Autoplay:", `>>> ${queue.autoplay ? "✅" : "❌"}`, true)
            .addField("❔ Filter:", `>>> \`${queue.filter || "❌"}\``, true)
            .addField("🎧 DJ-Role:", `>>> ${djs}`, true)
            .setFooter(client.user.username + " | by: Shiko Shintaro", client.user.displayAvatarURL())
            .setAuthor(message.author.tag, message.member.user.displayAvatarURL({
                dynamic: true
            }), "https://dc.musicium.eu")
            .setThumbnail(song.thumbnail)
        return embed; 
    } catch (error) {
        console.log(error)
        embedbuilder(5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error got sent to my owner!**")
        errorbuilder(error.stack.toString().substr(0, 2000))
    }
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}