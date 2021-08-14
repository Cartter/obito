module.exports.run = async ({ client, message, args }) => {

	if (!client.devs.includes(message.author.id)) return;

	var servers = client.guilds.cache
	var num = 0;
	var pagina = 1;
	var totalPages = parseInt(servers.size / 10 + 1);

	var embed = new client.utils.embed(message.author)

		.setDescription(`${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(0, 10).join('\n')}`)
		.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
		.setAuthor(`${client.guilds.cache.size} servers`)

	message.channel.send(embed).then(async ser => {

		if (servers.size > 10) {

			await ser.react("⬅");
			await ser.react("➡");

			const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 100000 });
			const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 100000 });

			voltar.on("collect", async r => {
				if (pagina !== 1) {
					num = num - 10
					num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
					pagina -= 1
					var embed = new client.utils.embed(message.author)

						.addField(`Servidores:`, `${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(pagina * 10 - 10, pagina * 10).join('\n')}`)
						.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
						.setAuthor(`${client.guilds.cache.size} servers`)

					ser.edit(embed)
					r.users.remove(message.author.id).catch(() => { })
				} else {
					pagina = totalPages
					num = totalPages * 10 - 20

					var embedb = new client.utils.embed(message.author)

						.setDescription(`${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(totalPages * 10 - 10, pagina * 10).join('\n')}`)
						.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

						.setAuthor(`${client.guilds.cache.size} servers`)
					ser.edit(embedb)

					r.users.remove(message.author.id).catch(() => { })
				}
			})

			proximo.on("collect", async r => {
				if (pagina !== totalPages) {
					num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
					num = num + 10
					pagina += 1

					var embedc = new client.utils.embed(message.author)

						.setDescription(`${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(pagina * 10 - 10, pagina * 10).join('\n')}`)
						.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

						.setAuthor(`${client.guilds.cache.size} servers`)
					ser.edit(embedc)

					r.users.remove(message.author.id).catch(() => { })
				} else {
					pagina = 1
					num = 0

					var embedd = new client.utils.embed(message.author)

						.setDescription(`${servers.map(se => `Nome: \`${se.name}\` - ID: \`${se.id}\` Users: \`${se.memberCount}\``).slice(0, pagina * 10).join('\n')}`)
						.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)

						.setAuthor(`${client.guilds.cache.size} servers`)
					ser.edit(embedd)

					r.users.remove(message.author.id).catch(() => { })
				}
			})
		}
	})
}
exports.help = {
	name: "servers",
	aliases: ['guilds'],
	description: "Mostra os servers que eu estou",
	usage: 'servers'
};