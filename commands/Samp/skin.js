const fetch = require('node-fetch');

exports.run = async ({ client, message, args, channel, prefix }) => {

	if (!args.join(" ")) return message.quote(`Como usar: \`${prefix}skin ID \``);
    let say = args.join(' ');

	const response = await fetch(`http://ls-rp.pt/images/skins/${say}.png`);
	if(say > 299 || response.body.bytesWritten == 0) return message.quote('ID inválido.');

	message.channel.send(new client.utils.attach(response.body, `skin_${say}.png`));
}

exports.help = {
    name: "test",
    aliases: ['skins'],
    description: "faz busca de uma skin pelo id.",
    usage: 'skin'
}

