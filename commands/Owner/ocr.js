var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports.run = async ({ client, message, args }) => {

    if (!client.devs.includes(message.author.id)) return;

    let carter = message.mentions.users.first() || client.users.cache.get(args[0]);
    let url = carter ? carter.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }) : await client.utils.imgDetect(message, args)

    const result = await client.utils.ocr.render(url)


    if (result.length > 2000) {
        let page = 0;
        const pages = client.utils.splitText(result, 1024);
        message.channel.send(new client.utils.embed(message.author).setDescription(`\`\`\`${pages[page]}\`\`\``).setTitle("OCR")).then(async (msg) => {
            await msg.react("⬅️");
            await msg.react("⏪");
            await msg.react("⏹️");
            await msg.react("⏩");
            await msg.react("➡️");

            const collector = msg.createReactionCollector((r, u) => ["⬅️", "➡️", "⏹️", "⏪", "⏩"].includes(r.emoji.name) && u.id == message.author.id, { time: 120000 });

            collector.on("collect", async (r) => {
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
                msg.edit(new client.utils.embed(message.author).setDescription(`\`\`\`${pages[page]}\`\`\``).setTitle("OCR"))
            });
            collector.on("end", (c, reason) => {
                if (message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) return msg.reactions.removeAll();
                msg.delete();
            });
        });
        return;
    }
    return message.channel.send(new client.utils.embed(message.author).setDescription(`\`\`\`${result}\`\`\``).setTitle("OCR"))
}

exports.help = {
    name: "ocr",
    aliases: ['renderizar', 'render'],
    description: "renderiza alguma img e manda o texto",
    usage: 'ocr'
};