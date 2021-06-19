const { MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system")
const config = require("../../config/shiko.json");
const cs = new CurrencySystem;
const { Db } = require('mongodb')


/**
 * @param {Db} shikodb
 */

module.exports = {
    name: 'beg',
    description: 'Begs for money~',
    cooldown: 10,
    category: 'Currency and Game',
    usage: 's!beg',

    run: async (client, message, args, shikodb) => {
        const HoloMems = [
            "Tokino Sora",
            "AZKi",
            "Roboco San",
            "Sakura Miko",
            "Shirakami Fubuki",
            "Natsuiro Matsuri",
            "Yozora Mel",
            "Akai Haato",
            "Aki Rosenthal",
            "Minato Aqua",
            "Yuzuki Choco",
            "Nakiri Ayame",
            "Murasaki Shion",
            "Oozora Subaru",
            "Ookami Mio",
            "Nekomata Okayu",
            "Inugami Korone",
            "Shiranui Flare",
            "Shirogane Noel",
            "Houshou Marine",
            "Usada Pekora",
            "Uruha Rushia",
            "Hoshimachi Suisei",
            "Amane Kanata",
            "Kiryu Coco",
            "Tsunomaki Watame",
            "Tokoyami Towa",
            "Himemori Luna",
            "Yukihana Lamy",
            "Momosuzu Nene",
            "Shishiro Botan",
            "Omaru Polka",
            "Ayunda Risu",
            "Moona Hoshinova",
            "Airani Lofifteen",
            "Kureiji Ollie",
            "Anya Melfissa",
            "Pavolia Reine",
            "Mori calliope",
            "Takanashi Kiara",
            "Ninomae Ina'nis",
            "Gawr Gura",
            "Watson Amelia",
            "Shiko Shintaro (DEV)"
        ]

        const AnswerError = [
            "Eh? Why Would i do that? immagine begging me for money lolol",
            "HA! Why would i give to a beggar like you? HAHA",
            "Trololol A beggar??? EWWW GET OUT OF MY SIGHT",
            "You know what? EARN SOME MONEY INSTEAD OF BEGGING ME",
            "Lmao why would i give you some money? for what purpose? gamble? HA! Whatta shame",
            "Begging for money? HA! no",
            "I didnt expect you do beg me for money lolol ill not give you lolol",
            "No ill not",
            "No just no",
            "Why would you beg me for money?? lolol",
            "Why would you go so far to beg for money?",
            "Whatta monster begging me for money just to gamble lolol",
            "Bwuh~ why are you begging me? lmao",
            "Bwuh~ no way just no stop it im poor",
            "WTF I SAID NO",
            "If i were you i need to put it in my bank and save money so that begger will come to me lolol",
            "I wonder why are you doing this",
            "Didnt expect for you to do me this bwuh",
            "Bwuh why begging me? can you just earn it for yourself?",
            "Why? why would you go so far to beg?",
        ]

        const AnswerSuccess = [
            "Hmmm~~ Here ya go~",
            "Welp if you this then make sure you win~",
            "Hmph! Fine! here ya go",
            "Hmmmm...... Okay here ya go",
            "Didnt expect for you to beg me so okay ill give u some",
            "Fine fine..... ill give u some of mine",
            "Hmmmmmmmm.......Ara Ara~ okay ill give you some~",
            "Okay~~ here you go~",
            "Hai hai... dozo~",
            "I dunno what will you do to my money but here you go",
            "Fine......i dunno ill just give you some",
            "I think you need some help so ill give you this",
            "I hope this will change your life be grateful",
            "I hope this will make you happy~",
        ]

        let result = await cs.beg({
            user: message.author,
            guild: message.guild,
            minAmount: 200,
            maxAmount: 1000,

        });

        const randomIndex = Math.floor(Math.random() * HoloMems.length);
        const randomIndex2 = Math.floor(Math.random() * AnswerError.length);
        const randomIndex3 = Math.floor(Math.random() * AnswerSuccess.length);

        if (result.error) {

            return message.channel.send(new MessageEmbed()
                .setTitle(HoloMems[randomIndex])
                .setDescription(AnswerError[randomIndex2])
                .setColor(config.colors.no)
                .setTimestamp()
            )

        }
        else
            message.channel.send(new MessageEmbed()
                .setTitle(HoloMems[randomIndex])
                .addFields(
                    {
                        name: AnswerSuccess[randomIndex3],
                        value: "You have earned\n" + `\`$${result.amount}.\``,
                        inline: true
                    }
                )
                .setTimestamp()
                .setColor("RANDOM")
            )
    }
}