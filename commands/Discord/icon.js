exports.run = async ({ client, message, args, lang }) => {

    let guild = client.guilds.cache.get(args[0]) || message.guild;
    let icon = guild.iconURL() ? guild.iconURL({ format: 'png', dynamic: true, size: 2048 }) : 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png'

    let Avatar = new client.utils.embed(message.author)
        .setDescription(lang.icon.click.replace("+url+", icon))
        //.setDescription(`<:link:571405258538876928> ${await client.utils.lang(lang, 'clique')} [${await client.utils.lang(lang, 'aqui')}](${icon}) ${await client.utils.lang(lang, 'baixar')}`)
        .setImage(icon)
    message.channel.send(Avatar)
}


exports.help = {
    name: "icon",
    aliases: ['guildicon'],
    description: "Mostra o icone do servidor",
    usage: "avatar"
};