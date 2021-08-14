exports.run = async({ client, message, args, lang }) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.quote(lang.clearchat.perm);

    if (!args.join(" ")) return message.quote(lang.clearchat.quantNumber)

    let totalDelMsg = parseInt(args[0]) + 1;
    let apagadas = totalDelMsg - 1;

    async function clear() {
        try {
            message.delete();
            const fetched = await message.channel.messages.fetch({ limit: totalDelMsg });
            message.channel.bulkDelete(fetched);
            message.channel.send(lang.clearchat.quantDelete.replace('+apagadas+', apagadas))
        } catch (e) {
            return message.quote(lang.clearchat.error.replace("+err+", e));
        }
    }
    clear();
}
exports.help = {
    name: "clearchat",
    aliases: ['apagarchat', 'limparchat', 'cc'],
    description: "Limpa o chat aonde o comando foi executado",
    usage: 'cc [2 á 100]'
};
