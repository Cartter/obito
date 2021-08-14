

module.exports.run = async ({ client, message, channel, lang }) => {

    const embed = new client.utils.embed(message.author)

    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return channel.send(lang.music.semCanal);

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel || (voiceChannel && voiceChannel.id !== player.voiceChannel))
        return channel.send(lang.music.semCanal);

    if (player.bands[0] === 0) {
        player.setEQ(
            { band: 0, gain: 0.25 },
            { band: 1, gain: 0.15 },
            { band: 2, gain: 0.10 }
        );
        channel.send(embed.setDescription(lang.music.graveActived))
    } else {
        player.clearEQ();
        channel.send(embed.setDescription(lang.music.graveDesactived))
    }
}


exports.help = {
    name: 'grave',
    aliases: ['g', 'graveboost'],
    description: "Aumenta/abaixa o Grave de uma musica",
    usage: 'grave [1 á 10]'
};