require('dotenv/config');

const { readdirSync, readdir } = require('fs');
const { Collection, Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.utils = require("./utils");
client.devs = ['498492304592601090']; 

client.commandsSeparated = new Collection();
client.commands = new Collection();
client.aliases = new Collection();

const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    let cmd = [];

    for (const file of commands) {

        cmd.push(file);
        let props = require(`./commands/${dirs}/${file}`);
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        })
        client.commandsSeparated.set(dirs, cmd.toString().replace(",", ","));
    }
}
const commandsDir = readdirSync('./commands/');
commandsDir.forEach(x => load(x));
client.login(process.env.DISCORD_TOKEN);
