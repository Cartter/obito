module.exports = async (client, member) => {

    const rows = await client.utils.schema.guilds(member.guild.id)
    if (rows[0] == null) return 0;

    const enus = JSON.parse(JSON.stringify(client.utils.langs.en))
    const ptbr = JSON.parse(JSON.stringify(client.utils.langs.pt))

    let lang = rows[0].lang

    switch (lang.toLowerCase()) {
        case 'br':
            lang = ptbr
            break;
        case 'en':
            lang = enus
            break;
        default:
            lang = enus
            break;
    }

    client.utils.functions.memberJoin(client, member, rows, lang) // boas vindas
    client.utils.functions.count.memberCount(client, member, rows, lang) // contador de membros
    client.utils.functions.role.roleAdd(client, member, rows, lang) // add role
}
