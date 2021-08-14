
const levels = {
    none: 0.0,
    low: 0.20,
    medium: 0.30,
    high: 0.35,
};



module.exports.run = async ({ client, message, args, lang, prefix }) => {

    const embed = new client.utils.embed(message.author)

    const player = message.client.manager.players.get(message.guild.id);

    if (!player) return message.quote.send(lang.music.semCanal);

    const { channel } = message.member.voice;

    if (!channel) return message.quote(lang.music.semCanal);
    if (channel.id !== player.voiceChannel) return message.quote(lang.music.msmCanal);

    if (!args) return message.quote(embed.setDescription(lang.music.use.replace("+prefix+", prefix)))

    let level = "none";
    if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

    player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

    message.quote(embed.setDescription(lang.music.bassChange.replace("+bass+", level)))
}


exports.help = {
    name: 'bassboost',
    aliases: ['b', 'bost'],
    description: "Aumenta/abaixa o Grave de uma musica",
    usage: 'bassboost [none, low, medium, high]'
};