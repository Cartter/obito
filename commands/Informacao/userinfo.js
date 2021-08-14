var moment = require('moment');
moment.locale('pt-BR');

exports.run = async ({ client, message, args, author, lang }) => {

    const user = author || message.author;

    var badges = {
        DISCORD_PARTNER: '<:staff:744962530795061289>',
        HYPESQUAD_EVENTS: '<:hypesquad2:744962044163522711>',
        BUGHUNTER_LEVEL_1: '<:bug_hunter:775119838782816276>',

        HOUSE_BRAVERY: '<:hypebravely:744954051048767518>',
        HOUSE_BRILLIANCE: '<:hypebrilliance:744962351903670283>',

        HOUSE_BALANCE: '<:hypebalance:744952016698343436>',
        VERIFIED_DEVELOPER: '<:badge:720429845708013648>',

        EARLY_VERIFIED_BOT_DEVELOPER: '<:badge:720429845708013648>',
        DISCORD_EMPLOYEE: '<:staff:744962530795061289>'

    }

    var tradd = {
        "CREATE_INSTANT_INVITE": "Criar convite instantâneo",
        "KICK_MEMBERS": "Expulsar usuários",
        "BAN_MEMBERS": "Banir usuários",
        "ADMINISTRATOR": "Administrador",
        "MANAGE_CHANNELS": "Gerenciar canais",
        "MANAGE_GUILD": "Gerenciar servidor",
        "STREAM": "Transmitir",
        "ADD_REACTIONS": "Adicionar reação",
        "VIEW_AUDIT_LOG": "Ver registro de auditoria",
        "VIEW_CHANNEL": "Ver canais",
        "READ_MESSAGES": "Ver mensagens",
        "SEND_MESSAGES": "Enviar mensagens",
        "SEND_TTS_MESSAGES": "Enviar mensagens com aúdio",
        "MANAGE_MESSAGES": "Gerenciar mensagens",
        "EMBED_LINKS": "Links em embed",
        "ATTACH_FILES": "Arquivos arquivados",
        "READ_MESSAGE_HISTORY": "Ver histórico de mensagens",
        "MENTION_EVERYONE": "Mencionar todos",
        "EXTERNAL_EMOJIS": "Emojis externos",
        "USE_EXTERNAL_EMOJIS": "Usar emojis externos",
        "CONNECT": "Conectar",
        "SPEAK": "Falar",
        "MUTE_MEMBERS": "Silenciar usuários",
        "DEAFEN_MEMBERS": "Perdoar usuários",
        "MOVE_MEMBERS": "Mover usuários",
        "USE_VAD": "Usar detecção de voz",
        "PRIORITY_SPEAKER": "Prioridade para falar",
        "CHANGE_NICKNAME": "Trocar apelido",
        "MANAGE_NICKNAMES": "Gerenciar apelidos",
        "MANAGE_ROLES": "Gerenciar cargos",
        "MANAGE_ROLES_OR_PERMISSIONS": "Gerenciar cargos e permissões",
        "MANAGE_WEBHOOKS": "Gerenciar webhooks",
        "MANAGE_EMOJIS": "Gerenciar emojis"
    }

    var status = {
        "online": "<:Online:568464325363367956>",
        "offline": "<:Offline:568464325350653968>",
        "dnd": "<:ocupado:717379117237928017>",
        "idle": "<:ausente:717379869721231421>",
    }

    const nitro = {
        "gif": '<:nitro:744957453610909857>',
        "png": '',
        "jpg": ''
    }

    const contaCriada = moment(author.createdTimestamp).format('lll');
    const diasContaCriada = moment.duration(message.createdTimestamp - author.createdTimestamp).asDays();

    const flags = user.flags

    let profileEmojis;

    if (flags) {
        profileEmojis = `${flags.toArray().map(b => badges[b]).join(" ")} ${status[user.presence.status]} ${nitro[user.displayAvatarURL({ format: 'png', dynamic: true }).slice(-3)]} | ${user.username}`
    } else {
        profileEmojis = `${status[user.presence.status]} ${nitro[user.displayAvatarURL({ format: 'png', dynamic: true }).slice(-3)]} | ${user.username}`
    }

    const member = message.guild.member(user)

    const embedUserInfo = new client.utils.embed(message.author)
        .setDescription(`${profileEmojis}`)
        .addField(lang.userinfo.userName, `\`${user.username}\``, true)
        .addField(lang.userinfo.userTag, `\`#${user.discriminator}\``, true)
        .addField(lang.userinfo.UserId, `\`${user.id}\``, true)
        .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .addField(lang.userinfo.userCreat, `\`${contaCriada}  (${Math.floor(diasContaCriada)} days)\``)

    if (member) {
        const entrouNoServer = moment(member.joinedTimestamp).format('lll');
        const diasEntrouNoServer = moment.duration(message.createdTimestamp - member.joinedTimestamp).asDays();

        embedUserInfo.addField(lang.userinfo.userJoin, `\`${entrouNoServer} (${Math.floor(diasEntrouNoServer)} days)\``);
    }

    const msg = await message.channel.send(message.author, embedUserInfo)

    if (member) {
        msg.react('▶️')

        const collector = msg.createReactionCollector((r, u) => ["▶️", "◀️"].includes(r.emoji.name) && u.id == message.author.id, { time: 120000 });

        const role = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(" | ").slice(0, 2000) || 'Sem cargo';
        let servidores = client.guilds.cache.filter(a => a.members.cache.get(member.id));

        collector.on("collect", async (r) => {
            switch (r.emoji.name) {
                case "▶️":
                    const embed = new client.utils.embed(message.author)
                        .setDescription(`${profileEmojis}`)
                        .addField(`${lang.userinfo.userCargos} (${member.roles.cache.size - 1})`, role)
                        .addField(lang.userinfo.userPerms, message.member.permissions.toArray().map(perms => `\`${tradd[perms]}\``).join(", "))
                        .addField(`${lang.userinfo.userServers} (${servidores.size})`, `>>> ${servidores.map(a => `\`${a.name}\``).join(' | ')}`)

                    msg.edit(embed)
                    msg.reactions.removeAll().catch(() => { })
                    msg.react('◀️').catch(() => { });
                    break;
                case "◀️":
                    msg.edit(embedUserInfo)
                    msg.reactions.removeAll().catch(() => { })
                    msg.react('▶️').catch(() => { });
                    break;
            }
        })
    }
}

exports.help = {
    name: "userinfo",
    aliases: ['ui'],
    description: "Mostra info de um usuário",
    usage: 'userinfo [@usuário]'
};