module.exports.run = async ({ message, client, channel, author }) => {
    channel.startTyping()
    const rank = await client.utils.canvas.perfil({ author, client, message })
    channel.send(new client.utils.attach(rank, 'perfil.png')).then(() => channel.stopTyping())
}

exports.help = {
    name: "perfil",
    aliases: ['profile'],
    description: "mostra seu profile.",
    usage: 'profile (@user)'
};
