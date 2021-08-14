const con = require("./mysql");

const guilds = (guildID) => {

    return new Promise(function (resolve, reject) {

        con.query(`SELECT * FROM guilds WHERE server= '${guildID}';`, async (err, rows) => {
            if (err) return reject(err)

            resolve(rows);
        })
    })
}

const users = (userID, guildID) => {

    if (guildID) {
        return new Promise(async function (resolve, reject) {
            con.query(`SELECT * FROM users WHERE ID = '${userID}' && guild = '${guildID}'`, async (err, rows) => {
                if (err) return reject(err)
                resolve(rows);
            });
        })
    } else {
        return new Promise(async function (resolve, reject) {
            con.query(`SELECT * FROM users WHERE ID = '${userID}'`, async (err, rows) => {
                if (err) return reject(err)
                resolve(rows);
            });
        })
    }
}

const orderBY = (guildID) => {
    return new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM users WHERE guild='${guildID}' ORDER BY level,xp ASC;`, async (err, rowsAll) => {
            if (err) return reject(err)
            resolve(rowsAll);
        })
    })
}

const music = (guildID) => {
    return new Promise(async function (resolve, reject) {
        con.query(`SELECT * FROM music WHERE guild= '${guildID}';`, async (MusicErr, musicRows) => {
            if (err) return reject(err)
            resolve(musicRows);
        })
    })
}


module.exports = { guilds, users, orderBY, music };
