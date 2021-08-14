module.exports = async (client, message) => {

    const rows = await client.utils.schema.guilds(message.guild.id)

    if (rows[0] == null) return 0;

    const enus = JSON.parse(JSON.stringify(client.utils.langs.en))
    const ptbr = JSON.parse(JSON.stringify(client.utils.langs.pt))

    let lang = rows[0].lang

    switch (lang.toLowerCase()) {
        case 'br':
            lang = ptbr
            break;
        case 'en':
            lang = enus
            break;
        default:
            lang = enus
            break;
    }

    let logChannel = message.guild.channels.cache.find(channel => channel.id === `${rows[0].CHANNEL_IDLOG}`);
    if (logChannel) {

        if (!message.content.length > null) return 0;

        let avatar = message.author.avatarURL
        let msg = message.content;
        msg = msg.replace(/`/g, "").substr(0, 1000)

        let embed = new client.utils.embed(message.author)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL)
            .setThumbnail(avatar)
            .addField(lang.events.user, `${message.author}`)
            .addField(lang.events.mDelete, `\`\`\`${msg}\`\`\``)
            .addField(lang.events.mCanal, `${message.channel}`)
        if (message.author.bot) return 0;
        logChannel.send(embed).catch(() => { })
    }
}