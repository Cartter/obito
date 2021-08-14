module.exports.run = async ({ client, message, args, lang }) => {

    const embed = new client.utils.embed(message.author)

    const player = message.client.manager.players.get(message.guild.id);
    if (!player) return message.quote(lang.music.semCanal);

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel || (voiceChannel && voiceChannel.id !== player.voiceChannel)) return channel.send(lang.music.semCanal);

    if (args[0] != 'bassboost' && args[0] != 'distortion' && args[0] != 'nightcore' && args[0] != 'nc' && args[0] != 'vaporwave') return message.quote(new client.utils.embed().setDescription(lang.music.efsDisponivel))

    if (args[0] == "bassboost") {
        if (player.bassboost == false) {
            player.setBassboost(true)
            message.quote(embed.setDescription(lang.music.bassActived))
            player.bassboost = true;
            return;
        }
        //
        if (player.bassboost == true) {
            player.setBassboost(false)
            message.quote(embed.setDescription(lang.music.bassDesactived))
            player.bassboost = false;
            return;
        }
    }

    if (args[0] == "distortion") {
        if (player.distortion == false) {
            player.setDistortion(true)
            message.quote(embed.setDescription(lang.music.distortionActived))
            player.distortion = true;
            return;
        }
        //
        if (player.distortion == true) {
            player.setDistortion(false)
            message.quote(embed.setDescription(lang.music.distortionDesActived))
            player.distortion = false;
            return;
        }
    }

    if (args[0] == "nightcore" || args[0] == "nc") {

        if (player.nightcore == false) {
            player.setNightcore(true)
            message.quote(embed.setDescription(lang.music.NightcoreActived))
            player.nightcore = true;
            return;
        }
        //
        if (player.nightcore == true) {
            player.setNightcore(false)
            message.quote(embed.setDescription(lang.music.NightcoredesActived))
            player.nightcore = false;
            return;
        }
    }

    if (args[0] == "vaporwave") {
        if (player.vaporwave == false) {
            player.setVaporwave(true)
            message.quote(embed.setDescription(lang.music.vaporwaveActived))
            player.vaporwave = true;
            return;
        }
        //
        if (player.vaporwave == true) {
            player.setVaporwave(false)
            message.quote(embed.setDescription(lang.music.vaporwaveDesActived))
            player.vaporwave = false;
            return;
        }
    }
}

exports.help = {
    name: 'effect',
    aliases: ['ef'],
    description: "Mude o efeito de uma música!",
    usage: 'effect'
};