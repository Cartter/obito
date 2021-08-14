module.exports = async (client) => {
    client.utils.langs.pt = {
        clearchat: {
            perm: "Você não tem permissão para usar este comando.",
            quantNumber: "Digite o número de mensagens que deseja excluir.",
            quantDelete: "Eu apaguei um total de: +apagadas+ mensagem.",
            error: "Parece que algo deu errado: +err+"
        },
        //
        config: {
            contador: "Contador de membros:",
            entrada: "Etranda:",
            saida: "saíd:",
            logEmbed: "Logs:",
            roleEmbed: "Auto-Role:",
            lang: "Linguagem: (+lang+) +prefix+config lang",
            removeContador: "config remove-counter",
            configContador: "config counter #canal",
            configCount: "config counter #canal",
            configentradaRemove: "config remove-entry",
            configEntrada: "config entrada #canal",
            configSaidaRemove: "config remove-leave",
            leaveMsg: "config saida #canal",
            configRemoveLog: "config remove-log",
            configLog: "config log #canal",
            configRemoveAutorole: "config remove-autorole",
            configAutorole: "config remove-autorole",

            invalidChannel: "O canal mencionado é inválido.",
            invalidRole: "O cargo mencionado é inválido.",
            prefix: "Insira um novo prefixo.",

            topico: "Contador de membros habilitado no tópico:",
            langChange: "idioma alterado para:",

            channelSend: "Canal para onde enviarei os logs:",
            autorole: "auto-role ativado com o cargo:",
            welcome: "canal onde enviarei notificações quando alguém entrar:",

            leave: "canal onde enviarei notificações quando alguém sair:",
            memberMsgLeave: "Bem-vindo desativado, não irei mais notificá-lo quando alguém sair.",
            memberMsgJoin: "Bem-vindo desativado, não irei mais notificá-lo quando alguém entrar.",
            role: "não será adicionado mais quando alguém entrar no servidor.",

            log: "Não vou mais enviar os logs para o canal:",
            topicCount: "Não contarei mais membros no tópico do canal:",

            prefixChange: "Prefixo alterado para:",
            langInvalid: "idioma inválido, idiomas disponíveis:",

            perm: "Você não tem permissão para usar este comando!",

        },
        //
        avatar: {
            click: "aperte [aqui](+url+) para baixar o avatar do membro."
        },
        icon: {
            click: "aperte [aqui](+url+) para baixar o ícone do servidor."
        },

        cowsay: {
            use: "Modo de usar: +prefix+cowsay texto."
        },

        emojify: {
            use: "Modo de usar: +prefix+emojify texto."
        },

        say: {
            use: "Modo de usar: +prefix+say texto.",
            sent: "Mensagem enviada por: +author+"
        },

        emoji: {
            notFound: "Emoji não econtrado."
        },

        emojiinfo: {
            info: "Informações:",
            animated: "Animado:",
            created: "Criado em:",
            id: "ID:",
            name: "Nome:",
            server: "Servidor:",
            ident: "Identificador:",
            url: "Link:",
            click: "aperte [aqui](+url+) para baixar a imagem.",
            notfound: "Emoji não econtrado."
        },

        help: {
            helpAq: "Aqui esta minha ajuda sobre o comando: +cmd+",
            helpCmd: "Comando: +cmd+",
            helpUsage: "Como usar: +cmd+",
            helpAlter: "Alternativas: +cmd+",
            helpObs: "Observações: +cmd+",
            helpParameter: "parâmetro entre \`[]\`: Obrigatório | parâmetro entre \`()\` opcional:",
            helpExample: "Aqui você verá um breve resumo dos meus comandos, para saber mais reaja no emoji da determinada categoria. Caso tenha alguma dúvida sobre como usar o comando use: +prefix+ajuda [nome-do-comando]"
        },
        ontime: {
            time: "Estou online á:"
        },
        userinfo: {
            userName: "Nome do usuário:",
            userTag: "🔖 TAG do usuário:",
            UserId: "💻 ID do usuário::",
            userCargos: "💼 Cargos:",
            userCreat: "📅 Conta criada há:",
            userJoin: "💼 Entrou no serve:",
            userPerms: "🛡️  Permissões:",
            userServers: "🌐 Servidores compartilhado:",
        },
        weather: {
            locale: "Fale um local que exista, ou coloque o nome corretamente!",
            weatherTempo: "Tempo para: +name+",
            weatherTime: "⏰ Fuso horário:",
            weatherGrau: "🌡️ Tipo de grau:",
            weatherTempatura: "🌡️ Temperatura:",
            weatherSensa: "🌡️ Sensação térmica:",
            weatherVent: "🌬️ Ventos:",
            eatherUmi: "💦 Umidade:",
            eatherUsage: "Modo de usar: +prefix+clima cidade/estado",
        },
        minecraft: {
            mineConquista: "Conquista desbloqueada!",
            mineInsira: "Por favor insira uma conquista.",
            mineCaracteres: "Você inseriu mais de 22 caracteres.",
        },
        music: {
            semCanal: "Entre em um canal de voz e use o comando novamente.",
            msmCanal: "Você não está no mesmo canal de voz que eu.",
            semPerm: "Não tenho permissão para me conectar a este canal de voz",
            use: "Modo de usar: +prefix+bassboost [none, low, medium, high]",
            bassChange: "bassboost alterado para: +bass+",
            queue: "Não há música na fila!",
            bassActived: "bassboost ativado!",
            bassDesactived: "bassboost desativado!",


            distortionActived: "distortion ativado!",
            distortionDesActived: "distortion desativado!",
            NightcoreActived: "Nightcore ativado!",
            NightcoredesActived: "Nightcore desativado!",
            vaporwaveActived: "vaporwave ativado!",
            vaporwaveDesActived: "vaporwave desativado!",
            efsDisponivel: "Efeitos disponíveis: \`bassboost, distortion, nightcore, vaporwave\`",

            skip: "Pulado para: +title+",

            graveActived: "Grave ativado!",
            graveDesactived: "Grave desativado!",

            number: "Número inválido.",
            jump: "Não é possível pular para uma música que já está tocando. Para pular o tipo de música que está tocando, use: +prefix+skip",
            jumpMusic: "Pulado para: +title+",

            musicNotPause: "A musica ja esta pausada.",
            musicDespaused: "⏯️ Música pausada com sucesso!",
            musicPause: "A música foi pausada com sucesso, para cancelar, use: +prefix+resume.",

            musicUrl: "Você precisa me dar um URL ou o nome da música.",
            musicSearch: "Procurando musica...",

            //play
            musicErr: "Ocorreu um erro ao pesquisar: +err+",
            musicResult: "Nenhum resultado foi encontrado.",
            musicAddQueue: "Música adicionada à fila: +music+",
            musicPlaylistAdd: "lista de reprodução adicionada à fila: +name+ : +length+ music.",

            select: "Selecione de 1 a 5.",

            playing: "Tocando agora:",
            noPlaying: "Não há música tocando!",
            invalidNumber: "Número inválido.",
            notSkip: "Não é possível pular para uma música que já está tocando. Para pular o tipo de música que está tocando, use: +prefix+skip",
            musicNotFound: "Música não encontrada.",
            removeQueue: "A música: +music+ foi removido da fila",
            stopMusic: "Eu parei a música para você!",

            musicVolume: "O volume está em: +volume+",
            musicValor: "Você precisa me dar um volume entre 1 e 100.",
            volumeEm: "Volume alterado para: +volume+",


            Duration: "⏲️ Duração:",
            Channel: "📺 Canal:",
            Author: "👤 Autor:",
            Volume: "🔊 volume:",
        },

        osu: {
            use: "Por favor, use, +prefix+osu perfil."
        },

        rank: {
            faltaLvl: "O membro +author+ não tem nível neste servidor.",
            position: "POSIÇÃO"
        },

        //events
        events: {
            memberJoin: "👤 O membro +member+ entrou no servidor!",
            memberLeave: "👤 O membro +member+ saiu do servidor!",
            memberCount: "Atualmente temos: +length+ membros no servidor.",

            mDelete: "💬 Mensagem excluída:",
            mCanal: "<:canal:568488048686268419> Canal:",

            old: "💬 Mensagem antiga:",
            new: "💬 Nova mensagem:",
            user: "👥 Usuário:",

            updateAvatar: "📝 +member+ **alterou o nome!**\nAntigo nome: +oldMember+\nNovo nome: +newMember+",
            chageAvatar: "🖼 +member+ alterou o avatar!",

            menctionObito: "🥰 Olá +user+! Meu prefixo neste servidor é \`+prefixo+\` para ver o que eu posso fazer, use \`+prefix+ajuda\`!"
        }
    }
}