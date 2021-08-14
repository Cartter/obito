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
