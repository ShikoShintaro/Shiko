const client = require("../shiko-main");
const config = require("../config/shiko.json");
const Discord  = require("discord.js");
const prefix = config.prefix


client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));

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
            const noPermsEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Aww~~~ You dont have have permss~")
            .addField('Aweee~~~ you don\'t have permissions to run command:',  `\`${command.name}\``)
            .addField('Permission Required', `\`${invalidPerms}\``)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()

            return message.channel.send(noPermsEmbed);
        }
    }

    if (command) command.run(client, message, args)  
})