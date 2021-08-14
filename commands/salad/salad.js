
module.exports.run = async({ client, author, channel, args, prefix, lang }) => {
    let embed = new client.utils.embed()
    .setTitle("15, 223 used the command")
    .setDescription(`[salad.io](https://app.salad.io/) use the code \`WS5BBD\` to have mining accelerated by 2x.`)
    channel.send({ embed });
}

exports.help = {
    name: "salad",
    aliases: ['sa', 'lad'],
    description: "Manda o link do salad",
    usage: "salad"
};
