exports.run = async ({ client, message, args, prefix, lang }) => {

    try {


        let e = new client.utils.embed(message.author);

        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            e.setTitle(lang.help.helpAq.replace("+cmd+", command.help.name))
            e.addField(lang.help.helpCmd.replace("+cmd+", command.help.name), `\`\`\`ini\n[ ${command.help.description} ]\`\`\``)
            e.addField(lang.help.helpUsage, `\`${prefix}${command.help.usage}\``)
            e.addField(lang.help.helpAlter, `\`${command.help.aliases}\``)
            e.addField(lang.help.helpObs, lang.help.helpParameter)
            message.channel.send(e)
        }
        const valuesA = Array.from(client.commandsSeparated);

        const gg = lang.help.helpExample.replace("+prefix+", prefix) //`${await client.utils.lang(lang, 'cmdHelp')} \`${prefix}${await client.utils.lang(lang, 'cmdUse')}\``

        valuesA.forEach(async val => {
            let name = val.shift();

            let modiArray = name
                .replace('Admin', '👮 Admin')
                .replace('Discord', '<:dc:579359045685739531> Discord')
                .replace('Diversao', '😂 Diversão')
                .replace('Informacao', '📖 Informações')
                .replace('Diversao', '😂 Diversão')
                .replace('Mta', '<:mtasa:619163662707589150> Mta')
                .replace('Music', '🎧 Música')
                .replace('Nsfw', '🔞 Nsfw')
                .replace('Osu', '<:osu:579359643910930442> Osu')
                .replace('Rank', '🔶 Rank')
                .replace('Samp', '<:samp:579360245227323408> Samp')
                .replace('Minecraft', '<:mc:675739199756042271> Minecraft');
            if (name == "Owner" || name == "Nsfw") return 0;


            e.setDescription(gg)
            e.addField(`${modiArray}`, `\`${val.toString().replace(/,/g, ", ").replace(/.js/g, "")}\``);
        })
        if (args[0] === undefined || args[0] === null) return message.channel.send(e).then(m => m.delete({ timeout: 60 * 1000, reason: 'help comand' }))
    } catch (e) {
        message.channel.send(`\`\`\`${e.name}: ${e.message}\`\`\``);
    }
}

exports.help = {
    name: "help",
    aliases: ['ajuda'],
    description: "Mostra minha lista de comandos",
    usage: 'ajuda'
};