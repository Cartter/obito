module.exports = async (client, message, args) => {

    client.utils.langs.en(client)
    client.utils.langs.pt(client)




    client.utils.music(client)
    client.utils.dbSend(client)
    client.utils.dbl(client)
    //client.utils.reloadcmds(client)

    client.user.setActivity(`salad.io use the code: "WS5BBD"`)

    //client.user.setActivity(`Estou em ${client.guilds.cache.size.toLocaleString()} servidores!`);

    //await client.user.setActivity('@Uchiha Obito');
    //await client.user.setStatus('dnd');

    client.utils.logs.red(`Fui iniciado com sucesso\nGuilds: ${client.guilds.cache.size.toLocaleString()}\nUsers: ${client.users.cache.size.toLocaleString()}\nEmojis ${client.emojis.cache.size.toLocaleString()}\nCanais: ${client.channels.cache.size.toLocaleString()}`)

    client.guilds.cache.map(async guild => {

        const rows = await client.utils.schema.guilds(guild.id)

        let sql;
        if (rows.length < 1) {
            sql = `INSERT INTO guilds (server, CHANNEL_IDMEMBERCOUNT, CHANNEL_IDWELCOME, CHANNEL_IDLEAVE, IDCARGOADD, CHANNEL_IDLOG, prefix, lang) VALUES ('${guild.id}','', '', '', '', '', '!', 'en')`;
            await client.utils.mysql.query(sql)
        }

        /*const db_music = await client.utils.schema.music(guild.id)

        if (db_music.length < 1) {
            sql = `INSERT INTO music (guild, ef, volume, grave, bassboost) VALUES ('${guild.id}','0', '50', '0', '0')`;
            await client.utils.mysql.query(sql)
        }*/
    })
}

