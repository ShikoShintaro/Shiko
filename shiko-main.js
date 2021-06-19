const Discord = require('discord.js');
const client = new Discord.Client()
const fs = require('fs')
const { token, config, } = require('.//config/shiko.json')
const mongodb = require('mongodb')
const distube = require("distube");



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();


client.config = config;
client.queue = new Map();
module.exports = client;

['handler',].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
})

client.login(token)