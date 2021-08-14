const { load } = require('cheerio');
var request = require('request');


module.exports.run = async({ client, message, channel, args, prefix, lang }) => {

    if (args[0] === undefined || args[0] === null) return channel.send(`${await client.utils.lang(lang, 'procurar')} EX \`${prefix}wikimta OnPlayerConnect\``)

    request('https://wiki.multitheftauto.com/wiki/' + args[0], async function(error, response, body) {

        const result = load(response.body);
        const titleText = result('pre').text();

        if (!titleText > null) return channel.send(`${await client.utils.lang(lang, 'result')} \`${args[0]}\``);

        if (titleText.length > 2000) {
            let page = 0;
            const pages = client.utils.splitText(titleText, 1024);
            channel.send(pages[page], { code: 'js' }).then(async(msg) => {
                await msg.react("⬅️");
                await msg.react("⏪");
                await msg.react("⏹️");
                await msg.react("⏩");
                await msg.react("➡️");

                const collector = msg.createReactionCollector((r, u) => ["⬅️", "➡️", "⏹️", "⏪", "⏩"].includes(r.emoji.name) && u.id == message.author.id, { time: 120000 });

                collector.on("collect", async(r) => {
                    switch (r.emoji.name) {
                        case "⏪":
                            if (page === 0) return;
                            page = 0;
                            break;
                        case "⬅️":
                            if (page === 0) return;
                            page--;
                            break;
                        case "⏹️":
                            collector.stop();
                            break;
                        case "➡️":
                            if (page === pages.length - 1) return;
                            page++;
                            break;
                        case "⏩":
                            if (page === pages.length - 1) return;
                            page = pages.length - 1;
                            break;
                    }
                    if (["⏹️"].includes(r.emoji.name)) return;
                    if (channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) r.users.remove(message.author);
                    msg.edit(pages[page], { code: 'js' })
                });
                collector.on("end", (c, reason) => {
                    if (channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return msg.reactions.removeAll();
                    msg.delete();
                });
            });
            return;
        }
        return channel.send(titleText, { code: 'js' })
    })
}

exports.help = {
    name: "wikimta",
    aliases: ['wiki-mta', 'mtawiki'],
    description: "Faz uma busca no wikimta de uma função",
    usage: 'wikimta'
}