let { say } = require("cowsay")

exports.run = async({ client, author, channel, args, prefix, lang }) => {

    let botmessage = args.slice(0).join(" ")
    if (args[0] === undefined || args[0] === null) return channel.send(new client.utils.embed(author).setDescription(lang.cowsay.use.replace("+prefix+", prefix)))
    channel.send(say({ text: `${botmessage}`, e: "oO", T: "U " }), { code: 'js' });
}

exports.help = {
    name: "cowsay",
    aliases: ['cow'],
    description: "Faça uma vaquinha dizer algo para você!",
    usage: 'cowsay <Mensagem>'
};