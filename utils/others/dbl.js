const DBL = require('dblapi.js');

const dbl = (client) => {

    const dbl = new DBL(process.env.DBL_TOKEN, { webhookPort: process.env.PORT || 1337, webhookAuth: process.env.WEBHOOK_AUTH }, client)

    dbl.webhook.on('ready', hook => {
        console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
    });

    let votechannel = client.channels.cache.find(x => x.id === '821860030952898612')

    //========================================
    dbl.webhook.on('vote', async vote => {

        const user = await client.users.fetch(vote.user)

        votechannel.send(new client.utils.embed().setDescription(`\`${user.tag}\` acabou de votar em mim!`))

        userVoted = await client.users.cache.get(vote.user)

        if (userVoted) {
            userVoted.send(new client.utils.embed().setDescription(`Obrigado \`${user.tag}\` por votar! Você acaba de ganhar **+ 15 niveis** em todos os servidores! 🥰`)).catch(e => {
                console.log(e.message)
            })
        }
    })
    //========================================
    dbl.webhook.on('unvote', vote => {
        console.log(vote)
    })
};

module.exports = dbl
