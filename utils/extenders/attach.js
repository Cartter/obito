const { MessageAttachment } = require("discord.js");

module.exports = class attach extends MessageAttachment {
    constructor(obj, attachName = {}) {
        super(obj, attachName);
        this.name = attachName;
    }
};
