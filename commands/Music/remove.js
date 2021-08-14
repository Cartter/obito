module.exports.run = async ({ client, message, prefix, args, lang }) => {

    const player = client.manager.players.get(message.guild.id);
    if (!player || player.current) return message.quote(lang.music.noPlaying);
    
    if (isNaN(args[0])) return message.quote(lang.music.invalidNumber);

    if (args[0] === 0) return message.quote(lang.music.notSkip.replace("+prefix+", prefix));

    if ((args[0] > player.queue.length) || (args[0] && !player.queue[args[0] - 1])) return message.quote(lang.music.musicNotFound);

    const { title } = player.queue[args[0] - 1];

    player.queue.splice(args[0] - 1, 1);

    return message.quote(new client.utils.embed(message.author).setDescription(lang.music.notSkip.replace("+music+", title)));

}


exports.help = {
    name: "remove",
    aliases: ['re'],
    description: "Remove uma música da fila .",
    usage: 'jump'
};