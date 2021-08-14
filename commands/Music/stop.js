module.exports.run = async ({ client, message, lang }) => {

    const embed = new client.utils.embed(message.author)

    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.quote(lang.music.noPlaying);

    const { channel } = message.member.voice;

    if (!channel) return message.quote(lang.music.semCanal);
    if (channel.id !== player.voiceChannel) return message.quote(lang.music.semCanal);

    player.destroy();
     message.quote(embed.setDescription(lang.music.stopMusic));
}



module.exports.help = {
    name: "stop",
    aliases: ['parar', 'cancelar'],
    description: "Cancela todas as músicas que estão tocando.",
    usage: 'stop'
}