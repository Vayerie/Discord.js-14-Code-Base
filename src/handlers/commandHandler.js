const { readdirSync } = require("fs");

module.exports = (client) => {
	const commandFiles = readdirSync("./src/commands").filter((file) =>
		file.endsWith(".js")
	);
	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		if (command.name) {
			client.commands.set(command.name, command);
		} else {
			console.warn(
				`Command file ${file} does not have a "name" property and will not be loaded.`
			);
		}
	}
};
