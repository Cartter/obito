exports.run = async ({ client, message, args, channel, prefix }) => {

    const mm = await channel.send("<a:loading:693956763820490763> Procurando servidor aguarde...");

    let embed = new client.utils.embed(message.author)

    var split = args[0].split(":");

    var options = {
        host: split[0],
        port: split[1] || 7777
    }

    const rules = await client.utils.samp.rules(options.host, options.port).catch(e => null);
    const response = await client.utils.samp.info(options.host, options.port).catch(e => null);

    embed.setTitle('<:samp:579360245227323408> San Andreas: Multiplayer');
    embed.setDescription(`[${response.hostname}](https://${rules.weburl})`);
    embed.addField(`🛰 IP:`, `\`${options.host}:${options.port}\``, true);
    embed.addField(`📂 Versão:`, `\`${rules.version}\``, true);
    embed.addField(`👥 Jogadores:`, `\`${response.players}/${response.maxplayers}\``, true);
    embed.addField(`🗺 Mapa:`, `\`${response.mapname}\``, true);
    embed.addField("🎮 Gamemode", `\`${response.gamemode}\``, true);
    embed.addField("⏲ Hora", `\`${rules.worldtime}\``, true);
    channel.send(embed)
}


/*const query = require('samp-query')
var request = require('request');

exports.run = async ({ client, message, args, channel, prefix }) => {

    var embed = new client.utils.embed(message.author);
    const mm = await channel.send("<a:loading:693956763820490763> Procurando servidor aguarde...");

    embed.setDescription(`Forma de usar: \`${prefix}samp (IP:PORTA)\``);
    if (args[0] === undefined || args[0] === null) return mm.edit('', embed);

    var split = args[0].split(":");

    var options = {
        host: split[0],
        port: split[1] || 7777
    }
    var self = this;
    request.call(self, options, 'r', function (error, rules) {
        query(options, async function (error, response) {

            embed.setDescription(`:x: ${error}`); // Servidor não encontrado, Verifique o IP e tente novamente
            if (error) return mm.edit('', embed);

            var servers = response.players;
            var num = 0;
            var pagina = 1;
            var totalPages = parseInt(servers.length / 10 + 1);

            let WEB = `http://${response.rules.weburl}`;
            embed.setTitle('<:samp:579360245227323408> San Andreas: Multiplayer');
            embed.setDescription(`[${response.hostname}](${WEB})`);
            embed.addField(`🛰 IP:`, `\`${response.address}:${options.port}\``, true);
            embed.addField(`📂 Versão:`, `\`${response.rules.version}\``, true);
            embed.addField(`👥 Jogadores:`, `\`${response.online}/${response.maxplayers}\``, true);
            embed.addField(`🗺 Mapa:`, `\`${response.mapname}\``, true);
            embed.addField("🎮 Gamemode", `\`${response.gamemode}\``, true);
            embed.addField("⏲ Hora", `\`${response.rules.worldtime}\``, true);
            embed.setTimestamp(new Date());

            mm.edit('', embed).then(async ser => {
                if (servers.length > null) {
                    await ser.react('👥')
                }

                const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 100000 });
                const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 100000 });
                const players = ser.createReactionCollector((r, u) => r.emoji.name === "👥" && u.id === message.author.id, { time: 100000 });
                const normal = ser.createReactionCollector((r, u) => r.emoji.name === "◀️" && u.id === message.author.id, { time: 100000 });

                players.on('collect', async r => {
                    var embed = new client.utils.embed(message.author)
                        .setDescription(`${servers.map(se => `Name: \`${se.name}\` - ID: \`${se.id}\` - Score: \`${se.score}\` - Ping: \`${se.ping}\` `).slice(0, 10).join('\n')}`)
                        .setFooter(`Página ${pagina} de ${totalPages}, Jogadores: ${response.online}`, message.author.displayAvatarURL())
                        .setAuthor(`${response.hostname}`)
                        .setColor('#ff0202')
                    await ser.edit('', embed)
                    await ser.react('◀️')
                    r.users.remove(message.author.id).catch(() => { })
                    if (servers.length > 10) {
                        await ser.react("⬅");
                        await ser.react("➡");
                    }
                })
                normal.on("collect", async r => {
                    ser.edit(embed)
                    r.users.remove(message.author.id).catch(() => { })
                })
                voltar.on("collect", async r => {
                    if (pagina !== 1) {
                        num = num - 10
                        num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
                        pagina -= 1
                        var embed = new client.utils.embed(message.author)
                            .addField(`Jogadores:`, `${servers.map(se => `Name: \`${se.name}\` - ID: \`${se.id}\` - Score: \`${se.score}\` - Ping: \`${se.ping}\` `).slice(pagina * 10 - 10, pagina * 10).join('\n')}`)
                            .setFooter(`Página ${pagina} de ${totalPages}, Jogadores: ${response.online}`, message.author.displayAvatarURL)
                            .setColor('#ff0202')
                            .setAuthor(`Jogadores: ${response.online}`)
                            .setColor('#ff0202')

                        ser.edit(embed)
                        r.users.remove(message.author.id).catch(() => { })
                    } else {
                        pagina = totalPages
                        num = totalPages * 10 - 20

                        var embedb = new client.utils.embed(message.author)
                            .setDescription(`${servers.map(se => `Name: \`${se.name}\` - ID: \`${se.id}\` - Score: \`${se.score}\` - Ping: \`${se.ping}\` `).slice(totalPages * 10 - 10, pagina * 10).join('\n')}`)
                            .setFooter(`Página ${pagina} de ${totalPages}, Jogadores: ${response.online}`, message.author.displayAvatarURL)
                            .setAuthor(`Jogadores: ${response.online}`)
                            .setColor('#ff0202')
                        ser.edit('', embedb)

                        r.users.remove(message.author.id).catch(() => { })
                    }
                })

                proximo.on("collect", async r => {
                    if (pagina !== totalPages) {
                        num = num.toString().length > 1 ? num - parseInt(num.toString().slice(num.toString().length - 1)) : 0
                        num = num + 10
                        pagina += 1

                        var embedc = new client.utils.embed(message.author)
                            .setDescription(`${servers.map(se => `Name: \`${se.name}\` - ID: \`${se.id}\` - Score: \`${se.score}\` - Ping: \`${se.ping}\` `).slice(pagina * 10 - 10, pagina * 10).join('\n')}`)
                            .setFooter(`Página ${pagina} de ${totalPages}, Jogadores: ${response.online}`, message.author.displayAvatarURL)
                            .setAuthor(`Jogadores: ${response.online}`)
                            .setColor('#ff0202')
                        ser.edit('', embedc)

                        r.users.remove(message.author.id).catch(() => { })
                    } else {
                        pagina = 1
                        num = 0

                        var embedd = new client.utils.embed(message.author)
                            .setDescription(`${servers.map(se => `Name: \`${se.name}\` - ID: \`${se.id}\` - Score: \`${se.score}\` - Ping: \`${se.ping}\` `).slice(0, pagina * 10).join('\n')}`)
                            .setFooter(`Página ${pagina} de ${totalPages}, Jogadores: ${response.online}`, message.author.displayAvatarURL)
                            .setAuthor(`Jogadores: ${response.online}`)
                            .setColor('#ff0202')
                        ser.edit('', embedd)
                        r.users.remove(message.author.id).catch(() => { })
                    }
                })
            })
        })
    })
}
*/

exports.help = {
    name: "samp",
    aliases: ['query'],
    description: "Mostra info de um serve samp",
    usage: 'samp [IP:PORT]'
};
