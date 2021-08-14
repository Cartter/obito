const dgram = require('dgram');
const Iconv = require('iconv-lite');

const createPacket = (opcode, host, port) => {
  const packet = Buffer.alloc(10 + opcode.length);

  packet.write('SAMP');

  for (let i = 0; i < 4; i += 1) {
    packet[i + 4] = host.split('.')[i];
  }

  packet[8] = port & 0xFF; // eslint-disable-line no-bitwise
  packet[9] = port >> 8 & 0xFF; // eslint-disable-line no-bitwise, no-mixed-operators
  packet[10] = opcode.charCodeAt(0);

  return packet;
};

const sendPacket = (opcode, host, port) => new Promise((resolve, reject) => {
  const socket = dgram.createSocket('udp4');
  const packet = createPacket(opcode, host, port);

  try {
    socket.send(packet, 0, packet.length, port, host, (error) => {
      if (error) reject(error);
    });
  } catch (e) {
    reject(e);
  }

  const timeoutId = setTimeout(() => {
    socket.close();
    reject(new Error(`Host ${host} unavailable`));
  }, 2000);

  socket.on('message', (message) => {
    clearInterval(timeoutId);
    socket.close();
    resolve(message.slice(11));
  });
});

const info = (host, port) => new Promise((resolve, reject) => {
  const startTime = Date.now();
  sendPacket('i', host, port).then((message) => {
    const out = { ping: (Date.now() - startTime) };
    let offset = 0;
    let strlen = 0;

    out.passworded = message.readUInt8(offset);
    offset += 1;

    out.players = message.readUInt16LE(offset);
    offset += 2;

    out.maxplayers = message.readUInt16LE(offset);
    offset += 2;

    strlen = message.readUInt16LE(offset);
    offset += 4;

    out.hostname = Iconv.decode(message.slice(offset, offset += strlen), 'win1251');

    strlen = message.readUInt16LE(offset);
    offset += 4;

    out.gamemode = Iconv.decode(message.slice(offset, offset += strlen), 'win1251');

    strlen = message.readUInt16LE(offset);
    offset += 4;

    out.mapname = Iconv.decode(message.slice(offset, offset += strlen), 'win1251');

    resolve(out);
  }).catch(e => reject(e));
});

const rules = (host, port) => new Promise((resolve, reject) => {
  sendPacket('r', host, port).then((message) => {

    const out = {};
    let offset = 0;
    let strlen = 0;
    let propertyName;
    let value;

    let rulecount = message.readUInt16LE(offset);
    offset += 2;

    while (rulecount) {
      strlen = message.readUInt8(offset);
      offset += 1;

      propertyName = Iconv.decode(message.slice(offset, offset += strlen), 'win1251');

      strlen = message.readUInt8(offset);
      offset += 1;

      value = Iconv.decode(message.slice(offset, offset += strlen), 'win1251');

      out[propertyName] = value;

      rulecount -= 1;
    }

    resolve(out);
  }).catch(e => reject(e));
});



module.exports = { info, rules };
