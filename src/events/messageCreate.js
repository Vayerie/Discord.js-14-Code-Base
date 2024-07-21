module.exports = {
	name: "messageCreate",
	execute: async (client, message) => {
		if (!message.content.startsWith(client.prefix) || message.author.bot) {
			return;
		}

		const args = message.content.slice(client.prefix.length).trim().split(/ +/);
		const commandName = args.shift()?.toLowerCase();
		const command = client.commands.find(
			({ name, aliases }) =>
				name === commandName || aliases?.includes(commandName)
		);
		if (!command) {
			//await message.reply(`Unknown command => ${commandName}`);
			return;
		}

		try {
			command.execute(client, message, args);
		} catch (err) {
			client.log(err, "ERROR");
		}
	}
};
