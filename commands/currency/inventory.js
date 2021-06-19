const { MessageEmbed } = require("discord.js");
const CurrencySystem = require("currency-system")
const config = require("../../config/shiko.json");
const cs = new CurrencySystem;
const { Db } = require('mongodb')

/**
 * @param {Db} shikodb
 */

module.exports = {
    name: 'inventory',
    description: 'Checks your inventory',
    usage: "s!inv",
    aliases: ['inv'],

    run : async (client, message, args, shikodb) => {
        
    }
}