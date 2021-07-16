const client = require('../shiko-main');
const mongodb = require('mongodb')
const config = require('../config/shiko.json')


client.on('ready', () => {
    console.log('Im ready Mastah');

    const activity_list = [
        ["With my master~", "PLAYING"],
        ["My Master's actions", "WATCHING"],
        ["s!help", "LISTENING"],
        ["Manager", "WATCHNG"],
        ["With Manager", "PLAYING"],
        ["My beloved one", "WATCHING"],
        ["Neko world", "WATCHING"],
        ["Earth", "WATCHING"],
        ["Sirius A (Alpha Canis Majoris)", "COMPETING"]
    ];
    setInterval(() => {

		const index = Math.floor(Math.random() * activity_list.length);
		client.user.setActivity(activity_list[index][0], {type: activity_list[index][1]});
	}, 10000);
})

let shikouri = config.shikodb

let shikodb;
let shkodb = new mongodb.MongoClient(shikouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

shkodb.connect((err, db) => {
    if (err) throw err;
    shikodb = db.db("ShikoDB")
    console.log("Shiko is connected to the database!")
})
