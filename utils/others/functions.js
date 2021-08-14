const { MessageAttachment } = require('discord.js');

module.exports = {
    async memberJoin(client, member, rows, lang) {
        let logChannel = member.guild.channels.cache.find(channel => channel.id === `${rows[0].CHANNEL_IDWELCOME}`);
        if (logChannel) {

            var gg = new client.utils.embed()
            gg.setDescription(lang.events.memberJoin.replace("+member+", member.user.tag))
            logChannel.send(gg).catch(e => {
                client.utils.logs.good(`${e.name}: ${e.message}`)
            })

            client.utils.mysql.query(`SELECT * FROM users WHERE ID = '${member.id}' AND guild = '${member.guild.id}';`, async (err, rows) => {
                if (err) throw err;
                if (rows[0] != null) return;
                if (err) throw err;
                let sql;
                if (rows.length < 1) {
                    sql = `INSERT INTO users (ID, xp, level, guild, accessToken, background) VALUES ('${member.id}', '1', 1, '${member.guild.id}', '', '');`

                    if (err) throw err;
                    await client.utils.mysql.query(sql)
                }
            })
        }
    }
}

module.exports.leave = {
    async memberLeave(client, member, rows, lang) {
        let logChannel = member.guild.channels.cache.find(channel => channel.id === `${rows[0].CHANNEL_IDLEAVE}`);
        if (logChannel) {
            var gg = new client.utils.embed()
                .setDescription(lang.events.memberLeave.replace("+member+", member.user.tag))
            logChannel.send(gg).catch(e => {
                client.utils.logs.good(`${e.name}: ${e.message}`)
            })
        }
    }
}

module.exports.role = {
    roleAdd(client, member, rows) {
        let cargo = rows[0].IDCARGOADD;
        let roleAddUserJoin;
        if (!roleAddUserJoin > cargo) return 0;
        member.roles.add(member.guild.roles.cache.find(r => r.id === cargo)).catch(e => {
            if (e.message == "Supplied parameter was neither a Role nor a Snowflake.") {
                sql = `UPDATE guilds SET IDCARGOADD = '0' WHERE server = '${member.guild.id}'`;
                client.utils.mysql.query(sql)
            }
            if (e.message == "Missing Access") return 0;
            if (e.message == "Missing Permissions ") return 0;
        })
    }
}

//=============================================================================================================================================================================================================================//

module.exports.count = {
    async memberCount(client, member, rows, lang) {
        if (rows[0].CHANNEL_IDMEMBERCOUNT >= 1) {
            try {
                let guild = `${member.guild.memberCount - member.guild.members.cache.filter(m => m.user.bot).size}`.split("");
                let contadorGif = ['<a:numero0:688075336080162951>', '<a:numero1:688075335635435524>', '<a:numero2:688075338492018690>', '<a:numero3:688075338047422488>', '<a:numero4:688075337338191897>', '<a:numero5:688075338361995310>', '<a:numero6:688075339192467472>', '<a:numero7:688075338508402744>', '<a:numero8:688075337543843843>', '<a:numero9:688075338181378100>']
                countGif = '';
                for (let i = 0; i < guild.length; i++) { countGif += '' + contadorGif[guild[i]] + ''; }
                await member.guild.channels.cache.get(rows[0].CHANNEL_IDMEMBERCOUNT).setTopic(lang.events.memberCount.replace("+length+", countGif))

            } catch (e) {
                if (e.message == "Cannot read property 'setTopic' of undefined") {
                    sql = `UPDATE guilds SET CHANNEL_IDMEMBERCOUNT = '0' WHERE server = '${member.guild.id}'`
                    client.utils.mysql.query(sql)
                }
                if (e.message == "Missing Access") return 0;
                if (e.message == "Missing Permissions ") return 0;
            }
        }
    }
}


const express = require('express');

app = express();
app.listen(7777);

module.exports.host = {
    async sendDbDevs(client) {

        app.get("/sendFilesToDevs", function (req, res) {
            if (!req.query || !req.query.file) return res.status(404).end();
            const filetoSend = req.query.file;

            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            if (ip != "::ffff:127.0.0.1" && ip != "127.0.0.1" && ip != "::1" && ip != "localhost")
                return res.status(404).end();

            client.channels.cache.get('821844027481260053').send(new client.utils.attach(filetoSend.replace("%2F", "/"), "db.sql"));

            res.status(200).end();
        })
    }
}