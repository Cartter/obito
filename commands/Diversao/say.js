exports.run = async({ client, message, args, lang, prefix }) => {
    message.delete({ timeout: 500, reason: 'It had to be done.' }).catch(() => {})

    if (!args.join(" ")) return message.channel.send(new client.utils.embed().setDescription(lang.say.use.replace("+prefix+", prefix)))//message.quote(await client.utils.lang(lang, 'digito'));
    let say = args.join(' ');
    message.mentions.users.forEach((u) => say = say.replace(u.toString(), "@" + u.tag))
    message.mentions.roles.forEach((r) => say = say.replace(r.toString(), "@" + r.name))
    message.channel.send(`${say}\n\n ${lang.say.sent.replace("+author+", message.author)} ${message.author}`, { disableEveryone: true }).catch(() => {})
}

exports.help = {
    name: "say",
    aliases: ['falar', 'dizer', 'speak'],
    description: "Faça com que eu fale qualquer frase para você.",
    usage: 'falar [texto]'
};
