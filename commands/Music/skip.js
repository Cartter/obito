module.exports.run = async ({ client, message, lang }) => {

    const embed = new client.utils.embed(message.author)

    const player = message.client.manager.players.get(message.guild.id); 

    if (!player) return  message.quote(embed.description(lang.music.noPlaying));
    if (!player.playing) player.playing = true; 

    await message.react("⏩");
    player.stop(); 

}

module.exports.help = {
    name: "skip",
    aliases: ['pular', 'next'],
    description: "Pula a música que esta tocando.",
    usage: 'pular'
}