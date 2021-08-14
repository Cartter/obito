
const { Manager } = require("erela.js");
const Deezer = require("erela.js-deezer");
const Spotify = require("erela.js-spotify");

module.exports = client => {

    const nodes = [
        {
            host: process.env.LAVALINK_HOST,
            password: process.env.LAVALINK_PASSWORD,
            port: 1337,//process.env.LAVALINK_PORT,
        }
    ];

    const clientID = process.env.SPOTIFY_CLIENTID;
    const clientSecret = process.env.SPOTIFY_CLIENTSECRET;

    require("./effects")

    client.once("ready", () => {
        client.music = new ErelaClient(client, nodes, {
            player: CustomPlayer
        });
    });

    client.manager = new Manager({
        nodes,
        plugins: [
            new Spotify({ clientID, clientSecret }),
            new Deezer()
        ],
        autoPlay: true,
        secure: false,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    });
    client.manager.init(client.user.id);


    client.manager.on("nodeConnect", node => {
        console.log(`Node "${node.options.identifier}" connected.`)
    })

    client.manager.on("nodeError", (node, error) => {
        console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
    })

    client.on("raw", d => client.manager.updateVoiceState(d));

    client.manager.on("trackStart", async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);

        const time = client.utils.mstohours(track.duration)

        player.connect();

        require("./filters")(player)

        const enus = JSON.parse(JSON.stringify(client.utils.langs.en))
        const ptbr = JSON.parse(JSON.stringify(client.utils.langs.pt))

        const rows = await client.utils.schema.guilds((player.options.guild))
        if (rows[0] == null) return 0;

        let lang = rows[0].lang

        switch (lang.toLowerCase()) {
            case 'br':
                lang = ptbr
                break;
            case 'en':
                lang = enus
                break;
            default:
                lang = enus
                break;
        }
        let np = new client.utils.embed()
            .setColor("#d9d9d9")
            .setAuthor(lang.music.playing)
            .setDescription(`[${track.title}](${track.uri})`)
            .setThumbnail(track.thumbnail.replace(/default/g, 'mqdefault'))
            .addField(lang.music.Duration, `\`${time}\``, true)
            .addField(lang.music.Channel, `\`${track.author}\``, true)
            .addField(lang.music.Author, `${track.requester}`, true)
        np.addField(lang.music.Volume, `\`${player.volume}\``, true)
        channel.send(np).then(m => m.delete({ timeout: track.duration }));
    });

    client.manager.on("queueEnd", player => {
        const channel = client.channels.cache.get(player.textChannel);
        //channel.send("As músicas acabou.");
        player.destroy();
    });


    client.manager.on("socketClosed", (player, payload) => {
        if (payload.byRemote === true) player.destroy();
    });
    client.manager.on("playerMove", (player, currentChannel, newChannel) => {
        if (!newChannel) player.destroy();
        else player.voiceChannel = newChannel;
    });
}