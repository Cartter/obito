module.exports.run = async ({ client, message, args, lang }) => {

    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.quote(lang.music.noPlaying);

    const { channel } = message.member.voice;


    if (!channel) return message.quote(lang.music.semCanal);
    if (channel.id !== player.voiceChannel) return message.quote(lang.music.msmCanal);

    if (args.length && /queue/i.test(args[0])) {
        player.setQueueRepeat(!player.queueRepeat);
        const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
        message.quote(`${queueRepeat} playlist loop.`);
    }

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
    message.quote(`Repetir a música \`${trackRepeat}.\``);
}

module.exports.help = {
    name: "repeat",
    aliases: ['loop'],
    description: "Repete a música atual para Você",
    usage: 'repeat'
}