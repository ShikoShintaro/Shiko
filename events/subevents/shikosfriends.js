const Discord = require('discord.js')

module.exports.run = async (client, message, args, msgArray, shikodb) => {
    const shiko1 = new Discord.MessageEmbed()
        .setTitle("Akio Isogai's Social Links!")
        .addFields(
            {
                name: "Youtube",
                value: "https://www.youtube.com/c/AkioChTitoAks",
                
            },
            {
                name: "Discord",
                value: "https://discord.gg/CCKBeMV",
                
            }
        )
        .setColor("#FF00FF")
    const shiko2 = new Discord.MessageEmbed()
        .setTitle("SleepyNeko Ch. 眠そうな猫's Social Links!")
        .addFields(
            {
                name: "Twitter",
                value: "https://twitter.com/SleepyNekoCh",
            },
            {
                name: "Youtube",
                value: "https://www.youtube.com/channel/UCs-qQC2omQIlnSTZA3HazpA",
            },
            {
                name: "Discord",
                value: "https://discord.gg/8tda9UFNxu",
            },
        )
        .setColor("#FFFFFF")
    const shiko3 = new Discord.MessageEmbed()
        .setTitle("PisMus's Social Links!")
        .addFields(
            {
                name: "Twitter",
                value: "https://twitter.com/PismusC?s=09"
            },
            {
                name: "Youtube",
                value: "https://www.youtube.com/channel/UCkklRrh8kbF1lhCo3ehtd-Q"
            },
            {
                name: "Facebook",
                value: "https://m.facebook.com/pismusdashroom/?tsid=0.16768091778654604&source=result"
            },
            {
                name: "Twitch",
                value: "https://www.twitch.tv/pismusch"
            },
            {
                name: "Discord",
                value: "https://discord.gg/6hkFFaD3t8"
            }
        )
        .setColor("#000CFF")
    const shiko4 = new Discord.MessageEmbed()
        .setTitle("SuZeeKee's Social Links")
        .addFields(
            {
                name: "Youtube",
                value: "https://youtube.com/channel/UCFR_selA1C4fO-5UWCS4p_A"
            },
        )
        .setColor("#FF0004")
    const shiko5 = new Discord.MessageEmbed()
        .setTitle("Ishi Gou イシゴウ's Social Links")
        .addFields(
            {
                name: "Facebook",
                value: "https://www.facebook.com/ishigouberry"
            },
            {
                name: "Youtube",
                value: "https://www.youtube.com/channel/UCKt3B3cCLIEcwBs5v2eZkSA"
            }, 
            {
                name: "Twitter",
                value: "https://twitter.com/ishi_gou?s=09"
            },
            {
                name: "Discord",
                value: "https://discord.gg/DbUfA5aZbx"
            }
        )
        .setColor("#FF00E4")
    const shiko6 = new Discord.MessageEmbed()
        .setTitle("Kazuki Ch.'s Social Media")
        .addFields(
            {
                name: "Facebook",
                value: "https://www.facebook.com/238397944792708"
            },
            {
                name: "Twitter",
                value: "https://twitter.com/Kazuki_Vtuber"
            },
            {
                name: "Youtube",
                value: "https://www.youtube.com/channel/UC1qMDUfk3i46e1spTmudB1Q"
            },
            {
                name: "Twitch",
                value: "https://www.twitch.tv/kazuki_ch1_"
            }
        )
        .setColor("#0F00FF")
    
    const shiko = [
        shiko1,
        shiko2,
        shiko3,
        shiko4,
        shiko5, 
        shiko6,
    ]

    const randomIndex = Math.max(1, Math.floor(Math.random() * shiko.length));

    await message.channel.send(shiko[randomIndex])
}

module.exports.config = {
    name: "shikosfriends"
}