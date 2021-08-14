module.exports.run = async({ client, author, channel, lang }) => {

    const s = author.presence.activities;
    const spotifyInfo = s.find(s => s == 'Spotify');

    if (spotifyInfo == undefined || spotifyInfo.name !== 'Spotify') return channel.send(await client.utils.lang(lang, 'ouvindoSpotify'));

    channel.startTyping()
    const spotify = await client.utils.canvas.spotify({ author, channel, spotifyInfo })
    channel.send(new client.utils.attach(spotify, 'spotify.png')).then(() => channel.stopTyping())
}


exports.help = {
    name: "spotify",
    aliases: ['spfy'],
    description: "mostra a musica um o membro está ouvindo",
    usage: 'spotify [@user]'
};