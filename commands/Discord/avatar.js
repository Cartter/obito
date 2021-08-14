exports.run = async({ client, message, args, lang }) => {

    message.delete({ timeout: 100, reason: 'It had to be done.' }).catch(() => {});

    let pessoa = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const avatar = pessoa.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });

    let foto = new client.utils.embed(message.author)
        .setTitle(`:frame_photo: ${pessoa.tag}`)
        .setDescription(lang.avatar.click.replace("+url+", avatar))
        .setImage(avatar)
    message.channel.send(foto)
}

exports.help = {
    name: "avatar",
    aliases: ['foto', 'imagem'],
    description: "Mostra avatar de um membro",
    usage: "avatar [@user]"
};