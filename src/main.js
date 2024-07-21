/********************************************/
/***      Load environment variables      ***/
/********************************************/
const dotenv = require("dotenv");
dotenv.config();

/********************************************/
/***         Setup Discord client         ***/
/********************************************/
const { Collection } = require("discord.js");
const { client } = require("./index");
client.config = require("./config");
client.log = require("./logger");
client.intervals = new Collection();
client.actionData = new Collection();
client.apiKey = 0;

/********************************************/
/***        Load events & commands        ***/
/********************************************/
client.events = new Collection();
require("./handlers/eventHandler")(client);

client.commands = new Collection();

client.prefix = client.config.bot.prefix;

require("./handlers/commandHandler")(client);

client.login(process.env.TOKEN);
