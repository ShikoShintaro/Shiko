module.exports.run = (client, message, msgArray, shikodb) => {
    let args = msgArray.slice(0);
    let cmd = client.utils.get("response");
    cmd.run(message, args, shikodb)
};

module.exports.config = {
    name: "8ball"
}