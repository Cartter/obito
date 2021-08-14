const { inspect } = require("util");


module.exports.run = async({ client, message, args, lang }) => {

    if (!client.devs.includes(message.author.id)) return;

    let code = args.join(" ")

    if (!code) return message.channel.send(await client.utils.lang(lang, 'digito'))

    const user = (id) => client.users.cache.find((user) => user.id == id);
    const canal = (id) => client.channels.cache.find((c) => c.id == id);
    const role = (id) => message.guild.roles.cache.find((r) => r.id == id);
    const emoji = (id) => client.emojis.cache.find((r) => r.id == id);

    code = code.replace(/^`{3}(js)?|`{3}$/g, '')
    code = code.replace(/<@!?(\d{16,18})>/g, 'user($1)');
    code = code.replace(/<#?(\d{16,18})>/g, 'canal($1)');
    code = code.replace(/<@&?(\d{16,18})>/g, 'role($1)')
    code = code.replace(/<a?:.+:([0-9]+)>/g, 'emoji($1)')

    let result;

    try {
        const evaled = await eval(code);
        result = inspect(evaled, { depth: 0 }).replace(client.token, '*'.repeat(client.token.length))
    } catch (error) {
        result = error.toString();
    };


    if (result.includes(client.token)) return message.channel.send('*'.repeat(client.token.length))

    result = result.replace(/message.guild.members.cache.get\("(\d{16,18})"\)/g, "<@$1>");

    if (result.length > 2000) {
        let page = 0;
        const pages = client.utils.splitText(result, 1024);
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
    return message.channel.send(result, { code: 'js' })
}

exports.help = {
    name: "eval",
    aliases: ['eval', 'executarcmds', 'e'],
    description: "Executa CMD's",
    usage: 'eval [code]'
};