const client = require('../shiko-main');
const mongoose = require('mongoose')
const config = require('../config/shiko.json')


client.on('ready', () => {
    console.log('Im ready Mastah');
})

mongoose.connect(config.shikoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
})
.then(() => {
    console.log('Im connected to the database')
})
.catch((err) => {
    console.log(err)
})

