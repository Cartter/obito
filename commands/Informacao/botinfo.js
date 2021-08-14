const cpuStat = require("cpu-stat");
const os = require('os')

exports.run = async ({ client, message }) => {
    cpuStat.usagePercent(async function (err, percent, seconds) {
        const text = `\`\`\`ini\n[ ${os.cpus().map(i => `${i.model}`)[0]} ]\`\`\`\n🌐 Servers: \`${client.guilds.cache.size.toLocaleString()}\`\n👥 Users: \`${client.users.cache.size.toLocaleString()}\`\n\n<:channel:708794906528972851> Channels: \`${client.channels.cache.size.toLocaleString()}\`\n😂 Emojis: \`${client.emojis.cache.size.toLocaleString()}\`\n\n🔥 CPU: \`${percent.toFixed(2)}%\`\n📝 Memória: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}\`\n\n💻 Sistema: \`${os.platform()} - ${os.arch()}\``
        message.channel.send(new client.utils.embed(message.author).setDescription(text))
    })
}

exports.help = {
    name: "botinfo",
    aliases: ['vps', 'stats'],
    description: "Mostra os dados do bot",
    usage: 'stats'
};
