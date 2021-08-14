module.exports = async (client, guild) => {

    //client.utils.logs.blue(`Entrei no servidor '${guild.name} - (${guild.id})', membros: ${guild.memberCount}, owner: ${guild.owner.user.tag}`)
    client.user.setActivity(`salad.io use the code: "WS5BBD"`)
    //client.user.setActivity(`Estou em ${client.guilds.cache.size.toLocaleString()} servers!`);

    const rows = await client.utils.schema.guilds(guild.id)

    if (rows.length < 1) {
        let sql = `INSERT INTO guilds (server, CHANNEL_IDMEMBERCOUNT, CHANNEL_IDWELCOME, CHANNEL_IDLEAVE, IDCARGOADD, CHANNEL_IDLOG, prefix, lang) VALUES ('${guild.id}','', '', '', '', '', '!', 'en')`;
        await client.utils.mysql.query(sql)
    }
}
