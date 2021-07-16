const Discord = require('discord.js')


module.exports.run = (client, message, args, msgArray, shikodb) => {
    const Answer = [
        "***Shiko*** : If you love someone, and you want to make a move on it just do it dont wait for the other person to make that person love that person i hope it makes sense",
        "***Shiko*** : If someone needs you just help that person out it will make you stronger",
        "***Shiko*** : If someone needed your help because of love just help, any suggestions will do",
        "***Shiko*** : Nothing last forever because the future will change",
        "***Shiko*** : We cant predict the future but if you think of it, it may happen",
        "***Shiko*** : Sometimes love can be hurt sometimes it will make you blind but its inevitable",
        "***nut | クリゼル*** : Just be confident, don't let negativity let you down, i know you're gonna be happy when you are higher than your negativity",
        "***CompressedRar*** : Regret is something that we will taste after undecisiveness",
        "***SilentHoodieKun*** : U have to be nice to gain people, but when you become too nice you lose them.",
        "***Zαcharysαvory_.*** : If there's a hole there's a way",
        "***Lylii*** : You can't call it 'Living your Life' without experiencing jabol.......Jabol Is Life.....Jabol Is Everything.....No Jabol No Life",
        "***Manager*** : Keep calm and jabol your keeb(keyboard)",
        "***Yumeko*** : The best way out is always trough",
        "***Shela Ch.*** : Nothing is impossible the word itself Says \"IM IMPOSSIBLE\"",
        "***Kazuki Ch.*** : If you have lemons Just Make a fcking lemonade and jabol",
        "***Tito Aks*** : Sand is called sand cuz its between sea and land Sea | lAND",
        "***Ishi Gou イシゴウ*** : When in doubt, say \"heck it\", do it anyway, it's all up to the future you if what you did was worth it =v=",
        "***Jaisui Kumagami*** : Perhaps too much of everything is as bad as too little right??",
        "***PisMus*** : You can jabol midstream, if you are quiet enough"
    ]

    const randomIndex = Math.max(1, Math.floor(Math.random() * Answer.length));

    message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Words Of Wisdom`)
        .setDescription(Answer[randomIndex])
        .setColor("RANDOM")
    )
}


module.exports.config = {
    name: 'shikoswordsofwisdom',
    description: 'Words of Wisdom (beta)',
}