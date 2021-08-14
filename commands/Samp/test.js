const fetch = require('node-fetch');
const { readdirSync } = require('fs');


exports.run = async ({ client, message, args, channel, prefix }) => {

	let avatars = [];

	for (let i = 0; i < 299; i++) {
		avatars.push(i);
	}

	let embed = new client.utils.embed()
	    .setImage(`http://ls-rp.pt/images/skins/0.png`)
	    .setFooter("1/" + avatars.length)
	let msg = await message.channel.send(embed)

	msg.react('⬅️').then(() => {
	    msg.react('➡️')
	})

	let i = 0;
	const collector = msg.createReactionCollector((r, u) => (r.emoji.name === '⬅️' || r.emoji.name === '➡️') && (u.id !== client.user.id && u.id === message.author.id))
	collector.on("collect", (r, u) => {
	    switch (r.emoji.name) {
	        case '⬅️': {
	            if(i === 0) {
	                i = avatars.length - 1
	                let embed = new client.utils.embed()             
	                    .setImage(`http://ls-rp.pt/images/skins/${i}.png`)
	                    .setFooter((i + 1) + "/" + avatars.length)
	                r.users.remove(message.author.id).catch(() => { })
	                r.message.edit(embed)
	                break;
	            }
	            i--
	            let embed = new client.utils.embed()
	                .setImage(`http://ls-rp.pt/images/skins/${i}.png`)
	                .setFooter((i + 1) + "/" + avatars.length)
	            r.users.remove(message.author.id).catch(() => { })
	            r.message.edit(embed)
	            break;
	        }   
	        case '➡️': {
	            if(i === avatars.length - 1) {
	                i = 0
	                let embed = new client.utils.embed()
	                    .setImage(`http://ls-rp.pt/images/skins/${i}.png`)
	                    .setFooter((i + 1) + "/" + avatars.length)
	                r.users.remove(message.author.id).catch(() => { })
	                r.message.edit(embed)
	                break;
	            }
	            i++
	            let embed = new client.utils.embed()
	                .setImage(`http://ls-rp.pt/images/skins/${i}.png`)
	                .setFooter((i + 1) + "/" + avatars.length)
	            r.users.remove(message.author.id).catch(() => { })
	            r.message.edit(embed)
	            break;
	        }
	    }
	})
}

exports.help = {
    name: "test",
    aliases: ['skins'],
    description: "faz busca de uma skin pelo id.",
    usage: 'skin'
}

