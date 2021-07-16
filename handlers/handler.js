const fs = require('fs')
const ascii = require('ascii-table')
let table = new ascii("Commnand List");
let table2 = new ascii("Subevents")
table.setHeading('Commands', 'Status');

module.exports = client => {
    fs.readdirSync('./commands/').forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}`).filter(files => files.endsWith('.js'));

        for (let files of commands) {
            let get = require(`../commands/${dir}/${files}`);

            if (get.name) {
                client.commands.set(get.name, get);
                table.addRow(files, 'Success')
            } else {
                table.addRow(files, 'Failed');
                continue;
            }
            if (get.aliases && Array.isArray(get.aliases)) get.aliases.forEach(alias => client.aliases.set(alias, get.name))
        }
    })
    console.log(table.toString());

    fs.readdirSync('./events/').forEach(file => {
        const events = fs.readdirSync('./events/').filter((files) => files.endsWith('.js'));

        for (let files of events) {
            let get = require(`../events/${files}`)

            if (get.name) {
                client.events.set(get.name, get)
            } else {
                continue;
            }
        }
    })
    // fs.readdirSync('./events/subevents/').forEach(file => {
    //     const subevents = fs.readdirSync('./events/subevents/').filter((files) => files.endsWith('js'))

    //     for (let files of subevents) {
    //         let get = require(`../events/subevents/${files}`)

    //         if (get.name) {
    //             client.subevents.get(get.name, get)
    //             table2.addRow(files, 'Success')
    //         } else {
    //             table2.addRow(files, 'Failed');
    //             continue;
    //         }
    //     }
    // })

    fs.readdir('./events/subevents/', (err, files) => {
        console.log("Loading subevents");
            if (err) throw err;
                files.forEach((file, i) => {
                    const props = require(`../events/subevents/${file}`);
                        console.log(`${i + 1}. ${file} loaded`);
                            client.subevents.set(props.config.name, props);
        });
    });

    fs.readdir("./util/", (err, files) => {
        console.log("Loading utilities");
            if (err) throw err;
                files.forEach((file, i) => {
                    let props = require(`../util/${file}`);
                        console.log(`${i + 1}. ${file} loaded`);
                            client.utils.set(props.config.name, props);
        });
    });
}