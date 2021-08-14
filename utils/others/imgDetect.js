const isImageUrl = require('is-image-url');

const imgDetect = async (message, args) => {

	const msg = await message.channel.messages.fetch({ limit: 100 });
	const lastMessage =  await msg.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();

	let linkCreator;

	if(lastMessage == undefined) {
		linkCreator = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 });
	} else {
		linkCreator = isImageUrl(args.join(" ")) ? args.join(" "): message.attachments.map(i => i.url) ? lastMessage.attachments.map(u => u.url)[0] : args.join(" ");
	}
	return await linkCreator;
}

module.exports = imgDetect



/*const isImageUrl = require('is-image-url');

const imgDetect = async (message, args) => {

	const msg = await message.channel.messages.fetch();
	const lastMessage =  await msg.sort((a, b) => b.createdTimestamp - a.createdTimestamp).filter((m) => m.attachments.size > 0).first();

	const map = message.attachments.map(i => i.url) ? lastMessage.attachments.map(u => u.url) : args.join(" ");//'leticia né';
	const test = isImageUrl(args.join(" ")) ? args.join(" "): map[0];

	return await test;
}

module.exports = imgDetect
*/