exports.run = async ({ client, args, channel, lang, prefix }) => {
  if (!args[0]) return channel.send(lang.osu.use.replace("+prefix+", prefix));
  channel.startTyping();
  channel.send({ files: [new client.utils.attach(`https://lemmmy.pw/osusig/sig.php?colour=Red&uname=${args.join('%20')}&pp=2&countryrank&flagstroke&darktriangles&onlineindicator=undefined&xpbar&xpbarhex`, `banner.png`)] })
  channel.stopTyping();
}


exports.help = {
  name: "osu",
  aliases: ['osu!', 'userosu'],
  description: "Mostra perfil de um jogador de osu",
  usage: 'osu [username]'
}



/*const osu = require('node-osu');
const { MessageEmbed } = require('discord.js');

const api = new osu.Api("2c876c279dcfa1f96de6b1105c374a1ba08976d7", {
  notFoundAsError: true,
  completeScores: false,
  parseNumeric: false
})

exports.run = async (client, message, args) => {

  if (args[0] === undefined || args[0] === null) return message.channel.send('Porfavor coloque o nome de um usuario que joga osu!')
  let username = args.join(' ');

  api.getUser({ u: username }).then(user => {

    const embed = new client.utils.embed(message.author)
      .setDescription(`User: [${user.name}](https://osu.ppy.sh/users/${user.id})`)
      .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
      .addField(':large_orange_diamond: PP', `\`${Math.round(user.pp.raw).toLocaleString()}\``, true)
      .addField(':military_medal: Rank', `\`${user.pp.rank.toLocaleString()}\``, true)
      .addField(':globe_with_meridians: Country Rank', `\`${user.pp.countryRank.toLocaleString()}\``, true)
      .addField(`Country`, `:flag_${user.country.toLowerCase().toLocaleString()}: \`${user.country.toLocaleString()}\``, true)
      .addField(':up: Level', `\`${Math.round(user.level).toLocaleString()}\``, true)
      .addField(':video_game: Playcount', `\`${user.counts.plays.toLocaleString()}\``, true)
      .setFooter(message.author.tag, message.author.avatarURL())
      .setColor('random')
  channel.send(embed)
  })
}

exports.help = {
  name: "osu",
  aliases: ['osu!', 'userosu'],
  description: "Mostra perfil de um jogador de osu",
  usage: 'osu [username]'
};*/