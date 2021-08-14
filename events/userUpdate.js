const Canvas = require('canvas');

module.exports = async (client, oldMember, newMember) => {

    const avatarOLD = oldMember.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
    const avatarNEW = newMember.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

    let servidores = client.guilds.cache.filter(a => a.members.cache.get(oldMember.id))
    servidores = servidores.map(a => a.id)

    servidores.forEach(async guildID => {
        const rows = await client.utils.schema.guilds(guildID)

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

        const logChannel = client.channels.cache.find(channel => channel.id === rows[0].CHANNEL_IDLOG);

        if (logChannel) {

            if (oldMember.tag != newMember.tag) {
                let embedNome = new client.utils.embed()
                    .setAuthor(oldMember.tag, avatarOLD)
                    //`:pencil: ${newMember} **alterou o nome!**\nAntigo nome: \`${oldMember.tag}\`\nNovo nome: \`${newMember.tag}\``
                    .setDescription(lang.events.updateAvatar.replace("+member+", newMember).replace("+oldMember+", oldMember.tag).replace("+newMember+", newMember.tag))
                    .setColor('#00ceff')
                    .setFooter(oldMember.id, avatarOLD)
                    .setTimestamp(new Date())
                if (oldMember.bot) return 0;
                logChannel.send(embedNome)
            }
            if (avatarOLD == avatarNEW) return;

            oldImg = avatarOLD;
            newImg = avatarNEW;

            const update = await client.utils.canvas.beforeAfter({ oldImg, newImg })
            const attachment = new client.utils.attach(update, 'AvatarUpdate.png')

            const embed = new client.utils.embed()
                .setDescription(lang.events.chageAvatar.replace("+member+", newMember.tag))
                .setImage('attachment://AvatarUpdate.png')
                .setFooter(newMember.tag, avatarNEW)
                .setTimestamp(new Date())
            if (newMember.bot) return 0;
            logChannel.send({ embed, files: [attachment] }).catch(e => {
                console.log(`${e.name}: ${e.message}`)
            })
        }
    })
}

