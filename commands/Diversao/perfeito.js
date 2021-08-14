module.exports.run = async ({client, message, args, channel}) => {

	 let carter = message.mentions.users.first() || client.users.cache.get(args[0]);
	 let url = carter ? carter.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }) : await client.utils.imgDetect(message, args)

	 channel.startTyping()
   	 const perfeito = await client.utils.canvas.perfeito(url)
     await channel.send(new client.utils.attach(perfeito, 'perfeito.png')).then(() => channel.stopTyping())
}
exports.help = {
	name: "perfeito",
	aliases: ['excelente'],
	description: "Mostre para as pessoas o que realmente é perfeito!",
	usage: 'perfeito [@user]'
};
