module.exports.run = async ({ client, message, args, lang, prefix }) => {

    const { channel } = message.member.voice;
    if (!channel) return message.quote(lang.music.semCanal);

    if (!args.length) return message.quote(lang.music.musicUrl);

    const msg = await message.channel.send(lang.music.musicSearch)

    const player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        volume: 70,
        selfDeafen: true
    });

    //player.connect();

    const embed = new client.utils.embed(message.author)

    const search = args.join(' ');
    let res;

    try {
        res = await player.search(search, message.author);
        if (res.loadType === 'LOAD_FAILED') {
            if (!player.queue.current) player.destroy();
            throw new Error(res.exception.message);
        }
    } catch (err) {
        return message.quote(lang.music.musicErr.replace("+err+", err.message));
    }

    switch (res.loadType) {
        case 'NO_MATCHES':
            if (!player.queue.current) player.destroy();
            return message.quote(lang.music.musicResult);
        case 'TRACK_LOADED':
            player.queue.add(res.tracks[0]);

            if (!player.playing && !player.paused && !player.queue.length) player.play();


            return msg.edit("", embed.setDescription(lang.music.musicAddQueue.replace("+music+", res.tracks[0].title)))
        //msg.edit("", embed.setDescription(`**Música adicionada na fila:** \`${res.tracks[0].title}\`.`))


        case 'PLAYLIST_LOADED':
            player.queue.add(res.tracks);
            if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
            connect(player)
            return msg.edit("", embed.setDescription(lang.music.musicPlaylistAdd.replace("+name+", res.playlist.name).replace("+length+", res.tracks.length)))
        //msg.edit("", embed.setDescription(`**playlist adicionada na fila:**:  **${res.playlist.name}** : **${res.tracks.length} músicas**`))

        case 'SEARCH_RESULT':
            let max = 5;
            if (res.tracks.length < max) max = res.tracks.length;

            let emojis = {
                1: '<:UM:568470831043313678>',
                2: '<:DOIS:568470831621996544>',
                3: '<:TRES:568470831697625103>',
                4: '<:Quatro:568470831512944693>',
                5: '<:Cinco:568470831630516233>',
            }

            embed.setTitle(lang.music.select)
            embed.setDescription(`${res.tracks.slice(0, max).map((track, index) => `${emojis[++index]} - ** ${track.title}**`).join('\n')}\}`)
            msg.edit("", embed)

            const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, { time: 60 * 1000 });
            collector.on("collect", async r => {
                if (r.emoji.name === "❌") {
                    msg.delete({ timeout: 1000, reason: 'Musica end' }).catch(() => { })
                }
                let vote = getVote(r.emoji.name);
                if (vote) {
                    collector.stop();

                    const track = res.tracks[vote - 1];
                    player.queue.add(track);

                    if (!player.playing && !player.paused && !player.queue.length) player.play();
                    return message.quote(lang.music.musicAddQueue.replace("+music+", track.title));

                }
            })


            switch (max) {
                case 5: {
                    await msg.react(client.emojis.cache.get('568470831043313678')); //'1
                    await msg.react(client.emojis.cache.get('568470831621996544')); //2
                    await msg.react(client.emojis.cache.get('568470831697625103')); //3
                    await msg.react(client.emojis.cache.get('568470831512944693')); //4
                    await msg.react(client.emojis.cache.get('568470831630516233')); //5
                    await msg.react('❌');
                    break;
                }
                case 2: {
                    await msg.react(client.emojis.cache.get('568470831043313678'));//1
                    await msg.react(client.emojis.cache.get('568470831621996544'));//1
                    await msg.react('❌');
                    break;
                }
                case 0:
                    console.log("Nenhuma música foi encontrada")
                    break;
            }

            function getVote(name) {
                switch (name) {
                    case "UM":
                        return 1;
                    case "DOIS":
                        return 2;
                    case "TRES":
                        return 3;
                    case "Quatro":
                        return 4;
                    case "Cinco":
                        return 5;
                    default:
                        return;
                }
            }
            async function connect(player) {
                if (player.state == 'CONNECTED') {
                    console.log("player connected!")
                } else {
                    await player.connect();
                    await player.play();
                    console.log("player not connected!")
                }
            }
    }
}

module.exports.help = {
    name: "play",
    aliases: ['p', 'tocar', 'youtubeplay'],
    description: "Toca uma música do youtube",
    usage: 'play nome da musica'
}