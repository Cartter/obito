module.exports.run = async ({ client, channel, message, author }) => {
	channel.startTyping()
	const rank = await client.utils.canvas.profile({ author, message })
	channel.send(new client.utils.attach(rank, 'perfil.png')).then(() => channel.stopTyping())
}


exports.help = {
	name: "profile",
	aliases: ['prof'],
	description: "mostra perfil de um membro",
	usage: 'perfil [@membro]'
};



