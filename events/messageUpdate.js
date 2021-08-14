module.exports = async (bot, message, newMsg) => {

    if (message.content == newMsg.content) return;
    if (message.channel.type === "dm") return;

    const rows = await bot.utils.schema.guilds(message.guild.id)

    if (rows[0] == null) return 0;

    const enus = JSON.parse(JSON.stringify(bot.utils.langs.en))
    const ptbr = JSON.parse(JSON.stringify(bot.utils.langs.pt))

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

    let msg = message.content;
    msg = msg.replace(/`/g, "").substr(0, 900)
    let newmsg = newMsg.content;
    newmsg = newmsg.replace(/`/g, "").substr(0, 900)

    let canal = message.guild.channels.cache.get(rows[0].CHANNEL_IDLOG)
    if (canal) {
        let embed = new bot.utils.embed(message.author)
            .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`${lang.events.user} ${message.author}\n\n${lang.events.old} \n\`\`\`${msg}\`\`\`\n${lang.events.new}\n\`\`\`${newmsg}\`\`\`\n${lang.events.mCanal} ${message.channel}`)
        if (newMsg.author.bot) return 0;
        canal.send(embed).catch(() => { })
    }
    const prefix = rows[0].prefix;
    let client = newMsg.client;
    if (newMsg.author.bot) return;
    if (!newMsg.content.startsWith(prefix)) return;


    let command = newMsg.content.split(" ")[0].toLowerCase().slice(prefix.length);
    let args = newMsg.content.split(" ").slice(1);

    const channel = message.channel;
    const author = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;


    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if (message.channel.type === "dm" && cmd.conf.guildOnly) return message.channel.send("Este comando só pode ser usado em servidores!");
        cmd.run({ client, message, args, prefix, channel, author, lang })
    }
}