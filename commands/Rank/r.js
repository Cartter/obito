module.exports.run = async ({ client, message, args }) => {

	let guild = client.guilds.cache.get(args[0]) || message.guild;

	client.utils.mysql.query(`SELECT * FROM users WHERE guild='${guild.id}' ORDER BY level,xp ASC;`, async (err, rowsAll) => {
		let top = [];
		rowsAll.forEach(row => {
			const id = row.ID
			const user = guild.members.cache.get(id)

			if (user) {
				top.push(`{"user":"${row["ID"]}","xp":"${parseInt(row["xp"])}","level":"${parseInt(row["level"])}"}`);
			}
		});

		top.reverse();

		var servers = await top
		var num = 0;
		var pagina = 1;
		var totalPages = parseInt(top.length / 5 + 1)

		let i = 0; i < top.length; i++

		var embed = new client.utils.embed(message.author)
			.setDescription(`${servers.map(se => `\`${client.users.cache.get(JSON.parse(se)["user"]) ? client.users.cache.get(JSON.parse(se)["user"]).tag : 'Saiu do servidor'}\`\n\`\`\`Nivel: ${JSON.parse(se)["level"].toString()}\nXP: ${JSON.parse(se)["xp"].toString()}\`\`\``).slice(0, 5).join('\n')}`)
			.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))

		message.channel.send(embed).then(async ser => {

			ser.delete({ timeout: 200000, reason: 'It had to be done.' }).catch(() => { });

			if (top.length > 5) {

				await ser.react("⬅");
				await ser.react("➡");

				const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 200000 });
				const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 200000 });

				voltar.on("collect", async r => {
					if (pagina !== 1) {
						num = num - 20
						num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
						pagina -= 1
						var embed = new client.utils.embed(message.author)

							.addField(`Personagens:`, `${servers.map(se => `\`${client.users.cache.get(JSON.parse(se)["user"]) ? client.users.cache.get(JSON.parse(se)["user"]).tag : 'Saiu do servidor'}\`\n\`\`\`Nivel: ${JSON.parse(se)["level"].toString()}\nXP: ${JSON.parse(se)["xp"].toString()}\`\`\``).slice(pagina * 5 - 5, pagina * 5).join('\n')}`)
							.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))


						ser.edit(embed)
						r.users.remove(message.author.id).catch(() => { })
					} else {
						pagina = totalPages
						num = totalPages * 20 - 20

						var embedb = new client.utils.embed(message.author)

							.setDescription(`${servers.map(se => `\`${client.users.cache.get(JSON.parse(se)["user"]) ? client.users.cache.get(JSON.parse(se)["user"]).tag : 'Saiu do servidor'}\`\n\`\`\`Nivel: ${JSON.parse(se)["level"].toString()}\nXP: ${JSON.parse(se)["xp"].toString()}\`\`\``).slice(totalPages * 5 - 5, pagina * 5).join('\n')}`)
							.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))


						ser.edit(embedb)

						r.users.remove(message.author.id).catch(() => { })
					}
				})

				proximo.on("collect", async r => {
					if (pagina !== totalPages) {
						num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
						num = num + 20
						pagina += 1

						var embedc = new client.utils.embed(message.author)

							.setDescription(`${servers.map(se => `\`${client.users.cache.get(JSON.parse(se)["user"]) ? client.users.cache.get(JSON.parse(se)["user"]).tag : 'Saiu do servidor'}\`\n\`\`\`Nivel: ${JSON.parse(se)["level"].toString()}\nXP: ${JSON.parse(se)["xp"].toString()}\`\`\``).slice(pagina * 5 - 5, pagina * 5).join('\n')}`)
							.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))


						ser.edit(embedc)

						r.users.remove(message.author.id).catch(() => { })
					} else {
						pagina = 1
						num = 0

						var embedd = new client.utils.embed(message.author)

							.setDescription(`${servers.map(se => `\`${client.users.cache.get(JSON.parse(se)["user"]) ? client.users.cache.get(JSON.parse(se)["user"]).tag : 'Saiu do servidor'}\`\n\`\`\`Nivel: ${JSON.parse(se)["level"].toString()}\nXP: ${JSON.parse(se)["xp"].toString()}\`\`\``).slice(0, pagina * 5).join('\n')}`)
							.setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))


						ser.edit(embedd)

						r.users.remove(message.author.id).catch(() => { })
					}
				})
			}
		})
	})
}

exports.help = {
	name: "r",
	aliases: ['top', 'trk'],
	description: "Mostra os top 10 no rank",
	usage: 'rank'
};
