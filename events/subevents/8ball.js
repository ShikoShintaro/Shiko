module.exports = {
    name: '8ball',

    run : async(client, mesage, msgArray, shikoDB) => {
        let args = msgArray.slice(0);
        let cmd = client.utils.get("response");
        cmd.run(message, args, shikoDB)
    }
}