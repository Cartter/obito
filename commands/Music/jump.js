module.exports.run = async ({ client, message, prefix, args, lang }) => {

    const player = client.manager.players.get(message.guild.id);
    if (!player || player.current) return message.quote(lang.music.noPlaying);
    
    if (isNaN(args[0])) return message.quote(lang.music.invalidNumber);

    if (args[0] === 0) return message.quote(lang.music.notSkip.replace("+prefix+", prefix));

    if ((args[0] > player.queue.length) || (args[0] && !player.queue[args[0] - 1])) return message.quote(lang.music.musicNotFound);

    const { title } = player.queue[args[0] - 1];

    if (args[0] == 1) player.stop();

    player.queue.splice(0, args[0] - 1);

    player.stop();

    return message.quote(new client.utils.embed(message.author).setDescription(lang.music.skip.replace("+title+", title)))

}


exports.help = {
    name: "jump",
    aliases: ['j'],
    description: "Pula para uma música.",
    usage: 'jump'
};