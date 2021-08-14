exports.run = ({ client, message }) => {

  try {

    var num = 0;

    var servers = client.emojis.cache
    let emojisLength = client.emojis.cache.size;

    if (!emojisLength > 0) return message.channel.send('tem emoji n 😕');


    var pagina = 1;
    var totalPages = parseInt(servers.size / 25 + 1);

    var embed = new client.utils.embed(message.author)

      .setDescription(`${servers.map(se => se).slice(0, 25).join(' | ')}`)
      .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())
      .setAuthor(`${emojisLength} emojis`)
      .setColor('#36393e')

    message.channel.send(embed).then(async ser => {

      if (servers.size > 25) {

        await ser.react("⬅");
        await ser.react("➡");

        const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 250000 });
        const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 250000 });

        voltar.on("collect", async r => {
          if (pagina !== 1) {
            num = num - 25
            num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
            pagina -= 1
            var embed = new client.utils.embed(message.author)

              .addField(`Emojis:`, `${servers.map(se => se).slice(pagina * 25 - 25, pagina * 25).join(' | ')}`)
              .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())
              .setColor('#36393e')
              .setAuthor(`${emojisLength} emojis`)

            ser.edit(embed)
            r.users.remove(message.author.id).catch(() => { })
          } else {
            pagina = totalPages
            num = totalPages * 20 - 25

            var embedb = new client.utils.embed(message.author)

              .setDescription(`${servers.map(se => se).slice(totalPages * 25 - 25, pagina * 25).join(' | ')}`)
              .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())

              .setAuthor(`${emojisLength} emojis`)
              .setColor('#36393e')
            ser.edit(embedb)

            r.users.remove(message.author.id).catch(() => { })
          }
        })

        proximo.on("collect", async r => {
          if (pagina !== totalPages) {
            num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
            num = num + 25
            pagina += 1

            var embedc = new client.utils.embed(message.author)

              .setDescription(`${servers.map(se => se).slice(pagina * 25 - 25, pagina * 25).join(' | ')}`)
              .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())

              .setAuthor(`${emojisLength} emojis`)
              .setColor('#36393e')
            ser.edit(embedc)

            r.users.remove(message.author.id).catch(() => { })
          } else {
            pagina = 1
            num = 0

            var embedd = new client.utils.embed(message.author)

              .setDescription(`${servers.map(se => se).slice(0, pagina * 25).join(' | ')}`)
              .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL())

              .setAuthor(`${emojisLength} emojis`)
              .setColor('#36393e')
            ser.edit(embedd)

            r.users.remove(message.author.id).catch(() => { })
          }
        })
      }
    })
  } catch (e) {
    message.channel.send(`:x: ERRO:\`\`\`js\n${e.name}: ${e.message}\`\`\``)
  }
}
exports.help = {
  name: 'emojisall',
  aliases: ['emoticonsall'],
  description: 'Veja todos os emojis de todos servidores que eu estou',
  usage: 'emojisall'
};
