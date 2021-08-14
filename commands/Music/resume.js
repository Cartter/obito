module.exports.run = async ({ client, message, lang }) => {

    const embed = new client.utils.embed(message.author)

    const player = message.client.manager.players.get(message.guild.id);

    if (!player) return message.quote(lang.music.noPlaying);

    const { channel } = message.member.voice;

    if (!channel) return message.quote(lang.music.semCanal);
    if (channel.id !== player.voiceChannel) return message.quote(lang.music.msmCanal);
    if (player.paused == false) return message.quote(lang.music.musicNotPause);

    player.pause(false);
    message.quote(embed.setDescription(lang.music.musicDespaused))
}



module.exports.help = {
    name: "resume",
    aliases: ['continuar', 'despause'],
    description: "continue uma música que esta pausada!",
    usage: 'resume'
}