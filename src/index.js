const { Client } = require("discord.js");
const client = new Client({
	intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"]
});

module.exports = { client };
require("./main");
