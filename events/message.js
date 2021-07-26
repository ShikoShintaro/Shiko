const client = require("../shiko-main");
const config = require("../config/shiko.json");
const shikodb = require('../config/shiko.json').shikodb
const { Discord, MessageEmbed, Collection } = require("discord.js");
const prefix = config.prefix
const { Db } = require('mongodb');

const CurrencySystem = require('currency-system')
const cooldowns = new Map();

const Levels = require('discord-xp');
const { subevents } = require("../shiko-main");
Levels.setURL(shikodb)

const cs = new CurrencySystem;
cs.setMongoURL(shikodb);

cs.setDefaultWalletAmount(500)
cs.setDefaultBankAmount(1000)

/**
 * @param {Db} shikodb
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 *  @param {Discord.Collection} subevents  
*/


client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;

    let shikodb;

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild);
        message.channel.send(new MessageEmbed()
            .setTitle('Moe Moe Kyun~')
            .setDescription(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`)
            .setTimestamp()
            .setColor(config.colors.yes)
            .setFooter(client.user.username, client.user.displayAvatarURL())
        );
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));


    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }


    const current_time = Date.now()
    const time_stamps = cooldowns.get(command.name)
    const cooldown_amount = [command.cooldown] * 1000;


    if (time_stamps.has(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;

            return message.channel.send(new MessageEmbed()
                .setTitle('Oi youre too fast!')
                .setDescription('Please wait: \n' + `\`${time_left.toFixed(1)}\`\n` + 'more seconds to use again\n' + `**${command.name}**`)
                .setColor(config.colors.no)
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
            )
        }
    }


    time_stamps.set(message.author.id, current_time)
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount)



    const ValidPerms = [
        "ADMINISTRATOR",
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]


    if (command.permissions) {
        let invalidPerms = []
        for (const permission of command.permissions) {
            if (!ValidPerms.includes(permission)) {
                return console.log(`Invalid Perms`)
            }

            if (!message.member.hasPermission(permission)) {
                invalidPerms.push(permission)
            }
        }

        if (invalidPerms.length) {
            const noPermsEmbed = new MessageEmbed()
                .setColor(config.colors.no)
                .setTitle("Aww~~~ You dont have have permss~")
                .addField('Aweee~~~ you don\'t have permissions to run command:', `\`${command.name}\``)
                .addField('Permission Required', `\`${invalidPerms}\``)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()

            return message.channel.send(noPermsEmbed);
        }
    }

    try {
        command.run(client, message, args, shikodb)
    } catch (err) {
        message.channel.send(new MessageEmbed()
            .setTitle('Oi!')
            .setDescription('Invalid Command! use **s!help** to find all executable commands!')
            .setColor(config.colors.no)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        )
        console.log(err)
    }
    const msgArray = message.content.split(/\s+/g);
    const args1 = msgArray.slice(1);
    
    client.on("message", (message) => {
        if (message.content.startsWith("Shiko under the bottle cap,") && message.content.endsWith("what is your words wisdom?")){
            client.subevents.get("shikoswordsofwisdom").run(client, message, args, msgArray, shikodb)
        } 
        else if (message.content.startsWith("Shiko,") && message.content.endsWith("?")) {
            client.utils.get("response").run(client, message, args, msgArray, shikodb)
        }
        else if (message.content.startsWith("ShikoFriends")) {
            client.subevents.get("shikosfriends").run(client, message, args, msgArray, shikodb)
        }
        else if (message.content.startsWith("HiShikoShintaro")) {
            client.subevents.get("shikointro").run(client, message, args, msgArray, shikodb)
        }
    })
})