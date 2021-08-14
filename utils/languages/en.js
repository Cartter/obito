module.exports = async (client) => {
    client.utils.langs.en = {
        clearchat: {
            perm: "You are not allowed to use this command.",
            quantNumber: "Type the number of messages you want to delete.",
            quantDelete: "I deleted a total of +apagadas+ message.",
            error: "It looks like something went wrong: +err+"
        },
        //
        config: {
            contador: "Member Count:",
            entrada: "Input:",
            saida: "Leave:",
            logEmbed: "Logs:",
            roleEmbed: "Auto-Role:",
            lang: "Language: (+lang+) +prefix+config lang",
            removeContador: "config remove-counter",
            configContador: "config counter #canal",
            configCount: "config counter #canal",
            configentradaRemove: "config remove-entry",
            configEntrada: "config input #canal",
            configSaidaRemove: "config remove-leave",
            leaveMsg: "config leave #canal",
            configRemoveLog: "config remove-log",
            configLog: "config log #canal",
            configRemoveAutorole: "config remove-autorole",
            configAutorole: "config remove-autorole",

            invalidChannel: "The mentioned channel is invalid.",
            invalidRole: "The mentioned role is invalid.",
            prefix: "Enter the new prefix.",

            topico: "Member counter enabled on topic:",
            langChange: "language changed to:",

            channelSend: "Channel where I will send the logs.",
            autorole: "auto-role activated with the post:",
            welcome: "channel where I will send notifications when someone enters:",

            leave: "channel where I will send notifications when someone leaves:",
            memberMsgLeave: "Welcome disabled, I will no longer notify you when someone leaves:",
            memberMsgJoin: "Welcome disabled, I will no longer notify you when someone enters:",
            role: "will not be added any more when someone logs in to the server.",

            log: "I will no longer send the logs to the channel:",
            topicCount: "I will no longer count members on the channel topic:",

            prefixChange: "Prefix changed to:",
            langInvalid: "invalid language, available:",

            perm: "You are not allowed to use this command!",

        },
        //
        avatar: {
            click: "click [here](+url+) to download the image."
        },
        icon: {
            click: "click [here](+url+) to download the icon."
        },

        cowsay: {
            use: "to use: +prefix+cowsay text."
        },

        emojify: {
            use: "to use: +prefix+emojify text."
        },

        say: {
            use: "to use: +prefix+say text.",
            sent: "Message sent by: +author+"
        },

        emoji: {
            notFound: "Emoji not found."
        },

        emojiinfo: {
            info: "information:",
            animated: "Cheered up:",
            created: "Created on:",
            id: "ID:",
            name: "Name:",
            server: "Server:",
            ident: "Identifier:",
            url: "Link:",
            click: "click [here](+url+) to download the image.",
            notfound: "Emoji not found."
        },

        help: {
            helpAq: "Here is my help on the command: +cmd+",
            helpCmd: "Command: +cmd+",
            helpUsage: "How to use: +cmd+",
            helpAlter: "Alternatives: +cmd+",
            helpObs: "Comments: +cmd+",
            helpParameter: "parameter between \`[]\`: Required | parameter between \`()\` optional:",
            helpExample: "Here you will see a brief summary of my commands, to learn more react to the emoji of the given category. If you have any questions about using the use command: +prefix+help [command-name]"
        },
        ontime: {
            time: "I'm online:"
        },
        userinfo: {
            userName: "Username",
            userTag: "🔖 User TAG:",
            UserId: "💻 User ID:",
            userCargos: "💼 Roles:",
            userCreat: "📅 Account created ago:",
            userJoin: "💼 Joined the server:",
            userPerms: "🛡️  Permissions:",
            userServers: "🌐 Shared servers:",
        },
        weather: {
            locale: "Speak a location that exists, or put the name correctly!",
            weatherTempo: "Time for: +name+",
            weatherTime: "⏰ Timezone:",
            weatherGrau: "🌡️ Degree Type:",
            weatherTempatura: "🌡️ Temperature:",
            weatherSensa: "🌡️ Thermal sensation:",
            weatherVent: "🌬️ Winds:",
            eatherUmi: "💦 Moisture:",
            eatherUsage: "use: +prefix+weather city/state",
        },
        minecraft: {
            mineConquista: "Achievement unlocked!",
            mineInsira: "Please enter an achievement.",
            mineCaracteres: "You have entered more than 22 characters.",
        },
        music: {
            semCanal: "Enter a voice channel and use the command again.",
            msmCanal: "You are not on the same voice channel.",
            semPerm: "I am not allowed to connect to the voice channel test",
            use: "use: +prefix+bassboost [none, low, medium, high]",
            bassChange: "bassboost changed to: +bass+",
            queue: "There is no music in the queue!",
            bassActived: "bassboost activated!",
            bassDesactived: "bassboost disabled!",


            distortionActived: "distortion activated!",
            distortionDesActived: "distortion disabled!",
            NightcoreActived: "Nightcore activated!",
            NightcoredesActived: "Nightcore disabled!",
            vaporwaveActived: "vaporwave activated!",
            vaporwaveDesActived: "vaporwave disabled!",
            efsDisponivel: "Effects available: \`bassboost, distortion, nightcore, vaporwave\`",

            skip:"Skipped to: +title+",

            graveActived: "Grave activated!",
            graveDesactived: "Grave disabled!",

            number: "Invalid number.",
            jump: "It is not possible to skip to a song that is already playing. To skip the type of music that is playing use: +prefix+skip",
            jumpMusic: "Jumping to +title+",

            musicNotPause: "The music is already paused.",
            musicDespaused: "⏯️ Music triggered successfully!",
            musicPause: "The song was successfully paused, to cancel, use the +prefix+resume.",

            musicUrl: "You need to give me a URL, or the name of the song.",
            musicSearch: "Looking for music...",

            //play
            musicErr: "An error occurred while searching: +err+",
            musicResult: "No results were found.",
            musicAddQueue: "Music added to the queue: +music+",
            musicPlaylistAdd: "playlist added to queue: +name+ : +length+ music.",

            select: "Select from 1 to 5.",

            playing: "Playing now:",
            noPlaying: "There is no music playing!",
            invalidNumber: "Invalid number",
            notSkip: "It is not possible to skip to a song that is already playing. To skip the type of music that is playing use: +prefix+skip",
            musicNotFound: "Music not found.",
            removeQueue: "the song: +music+ has been removed from the queue",
            stopMusic: "I stopped the music for you!",

            musicVolume: "The volume is at: +volume+",
            musicValor: "You need to give me a volume between 1 and 100.",
            volumeEm: "Volume changed to: +volume+",


            Duration: "⏲️ Duration:",
            Channel: "📺 Channel:",
            Author: "👤 Author:",
            Volume: "🔊 volume:",
        },

        osu: {
            use: "please use, +prefix+osu profile."
        },

        rank: {
            faltaLvl: "The member +author+ has no level on this server.",
            position: "RANK"
        },

        //events
        events: {
            memberJoin: "👤 Member +member+ joined the server.",
            memberLeave: "👤 Member +member+ left the server.",
            memberCount: "We currently have: +length+ members on the server.",

            mDelete: "💬 Deleted message:",
            mCanal: "<:canal:568488048686268419> Channel:",

            old: "💬 Old message:",
            new: "💬 New message:",
            user: "👥 User:",

            updateAvatar: "📝 +member+ **changed the name!**\nOld name: +oldMember+\nNew name: +newMember+",
            chageAvatar: "🖼 +member+ alterou o avatar!",

            menctionObito: "🥰 Hello +user+! My prefix on this server is \`+prefixo+\` to see what I can do, use \`+prefix+ajuda\`"
        }
    }
}