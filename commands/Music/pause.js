module.exports.run = async ({ client, message, lang, prefix }) => {

    const { channel } = message.member.voice;
   
    const embed = new client.utils.embed(message.author)
   
    const player = message.client.manager.players.get(message.guild.id);

    if (!player) return channel.send(lang.music.semCanal);

    if (!channel) return message.quote(lang.music.semCanal);
    if (channel.id !== player.voiceChannel) return message.quote(lang.music.msmCanal);
    if (player.paused == true) return message.quote(lang.music.musicNotPause);

    player.pause(true);
     message.quote(embed.setDescription(lang.music.musicPause.replace("+prefix+", prefix)));
}


module.exports.help = {
    name: "pause",
    aliases: ['pausar'],
    description: "Pause uma música que esta tocando!",
    usage: 'pause'
}