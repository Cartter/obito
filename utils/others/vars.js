module.exports = {
    GiveRandomXP(bot, message) {
        try {
            var giveXP = Math.floor(Math.random() * 5);

            bot.utils.mysql.query(`SELECT * FROM users WHERE ID = '${message.author.id}' AND guild = '${message.guild.id}';`, async (err, rows) => {
                if (rows[0] == null || rows[0] == undefined) {

                    bot.utils.mysql.query(`INSERT INTO users (ID, xp, level, guild, background, fundo, color) VALUES ('${message.author.id}', ${giveXP}, 1, '${message.guild.id}', '', '0', '');`);
                } else {
                    var level = rows[0]["level"];
                    giveXP += rows[0]["xp"];
                    if (giveXP > level * 650) {
                        giveXP -= level * 650;
                        level += 1;
                    }
                    bot.utils.mysql.query(`UPDATE users SET xp = ${giveXP}, level = ${level} WHERE ID = '${message.author.id}' AND guild = '${message.guild.id}';`);
                }
            })
        }
        catch (err) {
            if (err) {
                if (config.debug)
                    console.error(err);
            }
        }
    },
    GetXP(user) {
        bot.utils.mysql.query(`SELECT * FROM users WHERE ID = '${user.id}'`, async (err, rows) => {
            if (rows)
                return rows[0]["xp"], rows[0]["level"];
            else
                return false;
        })
    },
}
