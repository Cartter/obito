const moment = require("moment");
require("moment-duration-format")

exports.run = async({ client, author, channel, lang }) => {
    let duration = moment.duration(client.uptime).format('D [D], H [H], m [M], s [S]');
    channel.send(new client.utils.embed().setDescription(`${author} ${lang.ontime.time} \`${duration}\``))
}

exports.help = {
    name: "ontime",
    aliases: ['uptime', 'tempoon'],
    description: "Mostra quanto tempo que eu estou online",
    usage: 'ontime'
};