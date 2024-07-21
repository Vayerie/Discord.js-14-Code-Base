const { readdirSync } = require("fs");

module.exports = (client) => {
	const eventFiles = readdirSync("./src/events");
	for (const file of eventFiles) {
		const event = require(`../events/${file}`);
		client.on(event.name, event.execute.bind(null, client));
		client.events.set(event.name, event);
	}
};
