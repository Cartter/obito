module.exports.run = async ({ client, message, args, lang }) => {

    const player = message.client.manager.players.get(message.guild.id);

    const embed = new client.utils.embed(message.author)

    if (!player) return message.quote(lang.music.noPlaying);
    if (!args.length) return message.quote(new client.utils.embed(message.author).setDescription(lang.music.musicVolume.replace("+volume+", player.volume)))

    const { channel } = message.member.voice;

    if (!channel) return message.quote(lang.music.semCanal);
    if (channel.id !== player.voiceChannel) return message.quote(lang.music.msmCanal);

    const volume = Number(args[0]);

    if (!volume || volume < 1 || volume > 100) return message.quote(lang.music.musicValor);

    player.setVolume(volume);
    message.channel.send(embed.setDescription(lang.music.volumeEm.replace("+volume+", volume)));


}

exports.help = {
    name: 'volume',
    aliases: ['altura', 'v'],
    description: "Aumenta/abaixa o volume de uma musica",
    usage: 'volume [1 á 200]'
};