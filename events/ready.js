const client = require('../shiko-main');
const mongodb = require('mongodb')
const config = require('../config/shiko.json')


client.on('ready', () => {
    console.log('Im ready Mastah');
})

let shikouri = config.shikodb

let shikodb;
let shkodb = new mongodb.MongoClient(shikouri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

shkodb.connect((err, db) => {
    if (err) throw err;
    shikodb = db.db("ShikoDB")
    console.log("Shiko is connected to the database!")
})
