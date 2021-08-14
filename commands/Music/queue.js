module.exports.run = async ({ client, message, args, lang }) => {

    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.quote(lang.music.queue);

    const queue = player.queue;
    const embed = new client.utils.embed(message.author)

    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embed.addField(lang.music.playing, `[${queue.current.title}](${queue.current.uri})`);

    if (!tracks.length) embed.setDescription(`Sem músicas em ${page > 1 ? `page ${page}` : "A fila"}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join("\n"));

    const maxPages = Math.ceil(queue.length / multiple);

    message.quote(embed);

}

module.exports.help = {
    name: "queue",
    aliases: ['f', 'fila', 'list'],
    description: "Mostra todas as músicas que estão na fila",
    usage: 'fila'
}


/*module.exports.run = async ({ client, message, args }) => {

    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.quote("Não estou tocando nada.");

    const queue = player.queue;

    var num = 0;
    let start = 1

    let queueLength = queue.size;


    var pagina = 1;
    var totalPages = parseInt(queue.size / 15 + 1);

    var embed = new client.utils.embed(message.author)
    if (queue.current) embed.addField("Tocando agora", `\`1\` - [${queue.current.title}](${queue.current.uri}) \`${client.utils.mstohours(queue.current.duration)}\``)
        .setDescription(`${queue.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) \`${client.utils.mstohours(track.duration)}\``).slice(0, 15).join('\n')}`)
        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())
        .setAuthor(`${queueLength} músicas`)
        .setColor('#36393e')

    message.channel.send(embed).then(async ser => {

        if (queue.size > 20) {

            await ser.react("⬅");
            await ser.react("➡");
        }
        const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 200000 });
        const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 200000 });

        voltar.on("collect", async r => {
            if (pagina !== 1) {
                num = num - 20
                num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
                pagina -= 1
                var embed = new client.utils.embed(message.author)
                    .setDescription(`${queue.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) \`${client.utils.mstohours(track.duration)}\``).slice(pagina * 15 - 15, pagina * 15).join('\n')}`)
                    .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())
                    .setColor('#36393e')
                    .setAuthor(`${queueLength} músicas`)

                ser.edit(embed)
                r.users.remove(message.author.id).catch(() => { })
            } else {
                pagina = totalPages
                num = totalPages * 20 - 20

                var embedb = new client.utils.embed(message.author)

                    .setDescription(`${queue.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) \`${client.utils.mstohours(track.duration)}\``).slice(totalPages * 15 - 15, pagina * 15).join('\n')}`)
                    .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())

                    .setAuthor(`${queueLength} músicas`)
                    .setColor('#36393e')
                ser.edit(embedb)

                r.users.remove(message.author.id).catch(() => { })
            }
        })

        proximo.on("collect", async r => {
            if (pagina !== totalPages) {
                num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
                num = num + 20
                pagina += 1

                var embedc = new client.utils.embed(message.author)
                    .setDescription(`${queue.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) \`${client.utils.mstohours(track.duration)}\``).slice(pagina * 15 - 15, pagina * 15).join('\n')}`)
                    .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())
                    .setAuthor(`${queueLength} músicas`)
                    .setColor('#36393e')
                ser.edit(embedc)

                r.users.remove(message.author.id).catch(() => { })
            } else {
                pagina = 1
                num = 0

                var embedd = new client.utils.embed(message.author)
                if (queue.current) embed.addField("Tocando agora", `[${queue.current.title}](${queue.current.uri})`)
                    .setDescription(`${queue.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) \`${client.utils.mstohours(track.duration)}\``).slice(0, pagina * 15).join('\n')}`)
                    .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())
                    .setAuthor(`${queueLength} músicas`)
                    .setColor('#36393e')
                ser.edit(embedd)

                r.users.remove(message.author.id).catch(() => { })
            }
        })
    })
}

module.exports.help = {
    name: "queue",
    aliases: ['f', 'fila', 'list'],
    description: "Mostra todas as músicas que estão na fila",
    usage: 'fila'
}*/