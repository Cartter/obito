const { readdirSync } = require('fs')

const reloadcmds = (client) => new Promise((resolve, reject) => {
    let load = dirs => {
        let commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {

            try {
                let pull = require(`../../commands/${dirs}/${file}`)
                delete require.cache[require.resolve(`../../commands/${dirs}/${file}`)]
                client.commands.set(pull.help.name, pull)
            }
            catch (e) {
                resolve(`\`\`\`${e.stack}\`\`\``)
            }
        }
    }
    let commandsDir = readdirSync('./commands');
    commandsDir.forEach(x => load(x));

    resolve(`\`${client.commands.size}\` commandos, foram recarregados com sucesso.`)
})


module.exports = reloadcmds




/*const { readdirSync } = require('fs')

const reloadcmds = (client) => {

    let load = dirs => {
        let commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {

            try {
                let pull = require(`../../commands/${dirs}/${file}`)
                delete require.cache[require.resolve(`../../commands/${dirs}/${file}`)]
                client.commands.set(pull.help.name, pull)
            }
            catch (e) {

            }
        }
    }
    let commandsDir = readdirSync('./commands');
    commandsDir.forEach(x => load(x));
};

module.exports = reloadcmds
*/