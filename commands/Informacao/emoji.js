const fetch = require('node-fetch')

module.exports.run = async({ client, message, prefix, channel }) => {

    const emoji = (id) => client.emojis.cache.find((r) => r.id == id);

    const gazz = 6 + prefix.length;

    const code = message.content.slice(gazz).replace(/<a?:.+:([0-9]+)>/g, '$1')

    const emojiResult = await emoji(code);

    if (!emojiResult) return channel.send('Emoji não econtrado.')

    const check = {
        "true": 'gif',
        "false": 'png'
    }
    const response = await fetch(emojiResult.url)
    if (!response.ok) throw new Error('off')
    channel.send(new client.utils.attach(response.body, `${emojiResult.name}.${check[emojiResult.animated]}`))
}


exports.help = {
    name: "emoji",
    aliases: ['emoji'],
    description: "Mostra um emoji com o tamanho maior."
};