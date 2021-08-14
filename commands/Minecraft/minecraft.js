const { get } = require('snekfetch');

exports.run = async({ client, message, args, lang }) => {
    let [title, contents] = args.join(" ").split("|");
    if (!contents)[title, contents] = [lang.minecraft.mineConquista, title];
    let rnd = Math.floor((Math.random() * 39) + 1);

    if (args.join(" ").toLowerCase().includes("burn")) rnd = 38;
    if (args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
    if (args.join(" ").toLowerCase().includes("cake")) rnd = 10;

    if (!args.join(" ")) return message.quote(lang.minecraft.mineInsira)
    if (title.length > 24 || contents.length > 22) return message.channel.send(lang.minecraft.mineCaracteres);
    const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
    get(url).then(r => message.channel.send({ files: [{ attachment: r.body }] }));
}


exports.help = {
    name: "minecraft",
    aliases: ['mc'],
    description: "Crie sua conquista personalizada de minecraft.",
    usage: 'minecraft <título>|<mensagem>',
};