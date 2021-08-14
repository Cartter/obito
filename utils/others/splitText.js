const splitText = (msg, division) => {
    if (msg.length <= division) return msg;

    const endElement = () => {
        ranText = ranText.trim();
        msgs.push(ranText);
        ranText = "";
    };

    const msgs = [];
    let ranText = "";
    const split = msg.split("\n");
    for (let i = 0; i < split.length; i++) {
        ranText += `${split[i]}\n`;
        if (ranText.length > division) endElement();
    }

    endElement();
    return msgs;
};


module.exports = splitText
