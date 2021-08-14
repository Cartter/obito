```txt
- obito# node .-
[PLAYER] - successfully loaded
[2021-08-14 13:39:31] Sucessful connection
[2021-08-14 13:39:37] bot was started
Guilds: 308
Users: 100.00, 461
Emojis 3,830
Canais: 8,334
Webhook running at http://0.0.0.0:3151/dblwebhook
Node "localhost" connected.
```

```javascript
module.exports = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: parseInt(process.env.MYSQL_PORT)
})
```

```javascript
ctx.strokeStyle = color;
ctx.beginPath();
ctx.arc(avX, height / 2, avRadius + (ctx.lineWidth / 2) - 1, 0, 2 * Math.PI);
ctx.stroke();
ctx.closePath();

ctx.font = (Math.floor(58 - author.tag.length)) + 'px Arial';

const name = author.username;

const nameX = (margin * 2) + padding + (avRadius * 2);
const nameW = ctx.measureText(name).width;

const barWidth = ((width - (margin * 2) - nameX) - padding) + 5;
const progress = (gainedXp / requiredXp) * 100 * (barWidth / 100);

ctx.lineWidth = barRadius;
ctx.lineCap = 'round';

ctx.strokeStyle = '#484b4e';

const barX = nameX + 8;
const barY = ((height - (margin + padding)) - (barRadius / 2));
```


```javascript
require('dotenv/config');

const { readdirSync, readdir } = require('fs');
const { Collection, Client, Intents } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
```

```javascript
npm i
node .
```

```javascript
cd lavalink
java -jar Lavalink.jar
```
<table style="background: #000000; color: #fff;">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Aliases</th>
            <th scope="col">Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>clearchat</td>
            <td>Apagará certa quantidade de mensagens no canal que o comando for executado.</td>
            <td>apagarchat</td>
            <td>cc 2</td>
        </tr>
        <tr>
            <td>config</td>
            <td>Me configure do seu jeito</td>
            <td>c</td>
            <td>config </td>
        </tr>
        <tr>
            <td>listban</td>
            <td>Mosta uma lista de users banidos</td>
            <td>verbanidos</td>
            <td>listban</td>
        </tr>
        <tr>
            <td>avatar</td>
            <td>Mostra avatar de um membro</td>
            <td>imagem</td>
            <td>avatar [@user]</td>
        </tr>
        <tr>
            <td>emojis</td>
            <td>Veja todos os emojis que um servidor possuí!</td>
            <td>emoticons</td>
            <td>emojis</td>
        </tr>
        <tr>
            <td>icon</td>
            <td>Mostra o icone do servidor</td>
            <td>guildicon</td>
            <td>avatar</td>
        </tr>
        <tr>
            <td>ping</td>
            <td>Mostra o ping atual do bot</td>
            <td>pong</td>
            <td>ping</td>
        </tr>
        <tr>
            <td>roles</td>
            <td>Lista todos os cargos que determinado servidor possuí!</td>
            <td>cargos</td>
            <td>cargos</td>
        </tr>
        <tr>
            <td>cowsay</td>
            <td>Faça uma vaquinha dizer algo para você!</td>
            <td>cow</td>
            <td>cowsay
                <Mensagem>
            </td>
        </tr>
        <tr>
            <td>emojify</td>
            <td>Faça com que eu fale qualquer frase para você usando emojis.</td>
            <td>emojisay</td>
            <td>emojify [texto]</td>
        </tr>
        <tr>
            <td>perfeito</td>
            <td>Mostre para as pessoas o que realmente é perfeito</td>
            <td>excelente</td>
            <td>perfeito [@User]</td>
        </tr>
        <tr>
            <td>say</td>
            <td>Faça com que eu fale qualquer frase para você.</td>
            <td>falar, dizer, speak</td>
            <td>falar [texto]</td>
        </tr>
        <tr>
            <td>triggered</td>
            <td>Sabe quando alguém está irritado? Então, crie uma imagem de alguém triggered</td>
            <td>tr</td>
            <td>triggered [@user]</td>
        </tr>
        <tr>
            <td>botinfo</td>
            <td>Mostra os dados do bot</td>
            <td>vps,stats</td>
            <td>botinfo</td>
        </tr>
        <tr>
            <td>emojiinfo</td>
            <td>Mostra informações do emoji!</td>
            <td>Nada</td>
            <td>infoemoji</td>
        </tr>
        <tr>
            <td>ontime</td>
            <td>Mostra quanto tempo que eu estou online!</td>
            <td>uptime</td>
            <td>uptime</td>
        </tr>
        <tr>
            <td>perfil</td>
            <td>mostra seu profile.!</td>
            <td>cargos</td>
            <td>cargos</td>
        </tr>
        <tr>
            <td>serverinfo</td>
            <td>Mostra informações do servidor!</td>
            <td>guildinfo</td>
            <td>guildinfo</td>
        </tr>
        <tr>
            <td>userinfo</td>
            <td>Mostra info de um usuário</td>
            <td>ui</td>
            <td>userinfo [@user]</td>
        </tr>
        <tr>
            <td>weather</td>
            <td>Mostra o clima da cidade!</td>
            <td>clima</td>
            <td>tempo [local]</td>
        </tr>
        <tr>
            <td>minecraft</td>
            <td>Crie sua conquista personalizada de minecraft.</td>
            <td>mc</td>
            <td>minecraft</td>
        </tr>
        <tr>
            <td>mtawiki</td>
            <td>Faz uma busca no wikimta de uma função!</td>
            <td>wiki-mta</td>
            <td>mtawiki</td>
        </tr>
        <tr>
            <td>rank</td>
            <td>mostra seu nivel atual</td>
            <td>est, nivel</td>
            <td>nivel (@user)</td>
        </tr>
        <tr>
            <td>play</td>
            <td>Toca uma música do youtube</td>
            <td>p, youtubeplay</td>
            <td>play nome da música</td>
        </tr>
        <tr>
            <td>grave</td>
            <td>Aumenta/abaixa o Grave de uma música</td>
            <td>g, graveboost</td>
            <td>grave [1 á 10]</td>
        </tr>
        <tr>
            <td>pause</td>
            <td>Pause uma música que esta tocando!</td>
            <td>pausar</td>
            <td>pause</td>
        </tr>
        <tr>
            <td>nowplaying</td>
            <td>mostra a musica que está tocando.</td>
            <td>np</td>
            <td>np</td>
        </tr>
        <tr>
            <td>repeat </td>
            <td>Repete a música atual para Você</td>
            <td>r</td>
            <td>repeat</td>
        </tr>
        <tr>
            <td>queue</td>
            <td>Mostra todas as músicas que estão na fila</td>
            <td>f, fila</td>
            <td>queue</td>
        </tr>
        <tr>
            <td>skip</td>
            <td>Pula a música que esta tocando.</td>
            <td>pular, next</td>
            <td>skip</td>
        </tr>
        <tr>
            <td>lyrics</td>
            <td>Mostra a letra da música que está sendo reproduzida</td>
            <td>letra</td>
            <td>lyrics</td>
        </tr>
        <tr>
            <td>stop</td>
            <td>Cancela todas as músicas que estão tocando.</td>
            <td>parar, cancelar</td>
            <td>stop</td>
        </tr>
        <tr>
            <td>effect</td>
            <td>Mude o efeito de uma música!</td>
            <td>ef</td>
            <td>ef nigthcore</td>
        </tr>
        <tr>
            <td>bassboost </td>
            <td>Aumenta/abaixa o Grave de uma musica</td>
            <td>b</td>
            <td>b high</td>
        </tr>
        <tr>
            <td>stop</td>
            <td>Cancela todas as músicas que estão tocando.</td>
            <td>parar, cancelar</td>
            <td>stop</td>
        </tr>
        <tr>
            <td>volume</td>
            <td>Aumenta/abaixa o volume de uma música</td>
            <td>v</td>
            <td>volume</td>
        </tr>
        <tr>
            <td>spotify</td>
            <td>Mostra a música que um o membro está ouvindo</td>
            <td>spfy</td>
            <td>spotify [@user]</td>
        </tr>
        <tr>
    </tbody>
</table>
<hr>

### **Dependency**
- **NodeJs:** &rarr; **[V12](https://nodejs.org/en/)**
- **Discord.js:** &rarr; **[NPM](https://www.npmjs.com/package/discord.js)**
- **MySql:** &rarr; **[NPM](https://www.npmjs.com/package/mysql)**

- **bot invite]:** &rarr; **[top.gg](https://top.gg/bot/530879398488834060)**
