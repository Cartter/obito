module.exports.run = async ({ client, channel, message, author, lang }) => {

    const userRank = await client.utils.schema.users(author.id, message.guild.id)

    if (userRank[0] == null) return message.channel.send(new client.utils.embed().setDescription(lang.rank.faltaLvl("+author+", author)))

    let levelUtils = []
    await userRank.forEach(row => {
        levelUtils.push(`{"xp":"${row["xp"]}","level":"${row["level"]}", "guild":"${row["guild"]}", "background":"${row["background"]}", "color":"${row["color"]}"}`);
    });

    levelUtils.reverse();

    const orderBY = await client.utils.schema.orderBY(message.guild.id)

    let topRank = [];
    orderBY.forEach(row => {

        const id = row.ID
        const user = message.guild.members.cache.get(id)

        if (user) {
            topRank.push(`{"user":"${row["ID"]}","xp":"${parseInt(row["xp"])}","level":"${parseInt(row["level"])}"}`);
        }
    })

    topRank.reverse();

    const member = message.guild.member(author);

    if(member == null) return channel.send("Esse usuário não está mais no servidor.")

    channel.startTyping()
    const rank = await client.utils.canvas.rank({ author, message, levelUtils, topRank, client, lang })
    channel.send(new client.utils.attach(rank, 'est.png')).then(() => channel.stopTyping())

    /*client.utils.mysql.query(`SELECT * FROM users WHERE ID = '${author.id}' && guild = '${message.guild.id}'`, async(err, rowsAll) => {

        if (rowsAll[0] == null) return message.channel.send(new client.utils.embed().setDescription(`${await client.utils.lang(lang, 'member')} ${author} ${await client.utils.lang(lang, 'level')}`))

        let levelUtils = []
        rowsAll.forEach(row => {
            levelUtils.push(`{"xp":"${row["xp"]}","level":"${row["level"]}", "guild":"${row["guild"]}", "background":"${row["background"]}", "color":"${row["color"]}"}`);
        });

        levelUtils.reverse();

        client.utils.mysql.query(`SELECT * FROM users WHERE guild='${message.guild.id}' ORDER BY level,xp ASC;`, async(err, rowsAll) => {
            let topRank = [];
            rowsAll.forEach(row => {

                const id = row.ID
                const user = message.guild.members.cache.get(id)

                if (user) {
                    topRank.push(`{"user":"${row["ID"]}","xp":"${parseInt(row["xp"])}","level":"${parseInt(row["level"])}"}`);
                }
            })

            topRank.reverse();

            channel.startTyping()
            const rank = await client.utils.canvas.rank({ author, message, levelUtils, topRank, client, lang })
            channel.send(new client.utils.attach(rank, 'est.png')).then(() => channel.stopTyping())
        })
    })*/
}
exports.help = {
    name: "rank",
    aliases: ['est', 'nivel'],
    description: "mostra seu nivel atual",
    usage: 'nivel (@user)'
};
