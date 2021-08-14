module.exports = async (client, guild, user) => {

    const rows = await client.utils.schema.guilds(guild.id)

    if (rows[0] == null) return 0;

    let canal = guild.channels.cache.get(rows[0].CHANNEL_IDLOG)
    if (canal) {
        let embed = new client.utils.embed(user)
            .setAuthor(`${guild.name}`, guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`\`${user.tag}\` banned.`)
        canal.send(embed)
    }
}