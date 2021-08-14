module.exports.run = async({ client, message, args, lang }) => {

    if (!client.devs.includes(message.author.id)) return;

    let code = args.join(" ")

    if (!code) message.channel.send(await client.utils.lang(lang, 'digito'))

    require("child_process").exec(`${code}`, async(e, r, t) => {



        if (r.length > 2000) {
            let page = 0;
            const pages = client.utils.splitText(r + t, 1024);
            message.channel.send(pages[page], { code: 'js' }).then(async(msg) => {
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
                    if (message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) r.users.remove(message.author);
                    msg.edit(pages[page], { code: 'js' })
                });
                collector.on("end", (c, reason) => {
                    if (message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return msg.reactions.removeAll();
                    msg.delete();
                });
            });
            return;
        }
        return message.channel.send(r + t, { code: 'js' })
    })
}

exports.help = {
    name: "exec",
    aliases: ['install'],
    description: "executa comandos na vps.",
    usage: 'exec [argumento]',
};