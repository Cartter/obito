var moment = require('moment');
moment.locale('pt-BR');

module.exports.run = async ({ client, message, prefix, channel, lang }) => {

    const emoji = (id) => client.emojis.cache.find((r) => r.id == id);

    const gazz = 10 + prefix.length;

    const code = message.content.slice(gazz).replace(/<a?:.+:([0-9]+)>/g, '$1')
    const emojiResult = await emoji(code);

    if (!emojiResult) return channel.send(lang.emojiinfo.notfound)

    const sn = {
        true: "sim",
        false: "Não"
    }

    let embed = new client.utils.embed(message.author)
        .setAuthor(lang.emojiinfo.info, emojiResult.url)
        .addField(lang.emojiinfo.animated, sn[emojiResult.animated], true)
        .addField(lang.emojiinfo.created, moment(emojiResult.createdAt).format('LL'), true)
        .addField(lang.emojiinfo.id, emojiResult.id, true)
        .addField(lang.emojiinfo.name, emojiResult.name, true)
        .addField(lang.emojiinfo.server, emojiResult.guild, true)
        .addField(lang.emojiinfo.ident, `\`${emojiResult}\``, true)
        .addField(lang.emojiinfo.ident.url, lang.emojiinfo.url.replace("+url+", emojiResult.url), true)
        .setThumbnail(emojiResult.url)
    channel.send(embed)
}


exports.help = {
    name: "emojiinfo",
    aliases: ['infoemoji'],
    description: "Mostra informações do emoji",
    usage: "emojiinfo"
};
