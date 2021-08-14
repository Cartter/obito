const { find } = require("weather-js");

module.exports.run = async ({ client, author, channel, args, prefix, lang }) => {

    if (args[0] === undefined || args[0] === null) return channel.send(new client.utils.embed(author).setDescription(lang.weather.eatherUsage.replace('+prefix+"', prefix)))

    let tuamsg = args.slice(0).join(' ')

    try {

        find({ search: tuamsg, degreeType: 'C', lang: 'pt-BR' }, async (err, result) => {
            result = result[0];
            if (!result) {
                channel.send(lang.weather.locale);
                return;
            }
            var current = result.current;
            var location = result.location;
            let embed = new client.utils.embed(author)

                .setAuthor(lang.weather.weatherTempo.replace('+name+"', location.name))
                .setDescription(`${current.skytext}`)
                .setThumbnail(current.imageUrl)
                .addField(lang.weather.weatherTime, `UTC${location.timezone >= 0 ? "+" : ""}${location.timezone}`, true)
                .addField(lang.weather.weatherGrau, location.degreetype, true)
                .addField(lang.weather.weatherTempatura, `${current.temperature}° C`, true)
                .addField(lang.weather.weatherSensa, `${current.feelslike}° C`, true)
                .addField(lang.weather.weatherVent, current.winddisplay, true)
                .addField(lang.weather.eatherUmi, `${current.humidity}%`, true)
            channel.send({ embed });
        })
    } catch (e) {
        console.log(`[LOG]: 'clima.js' ${e.name}:${e.message}`)
    }
}

exports.help = {
    name: "weather",
    aliases: ['tempo', 'clima'],
    description: "Mostra o clima da cidade",
    usage: "weather"
};
