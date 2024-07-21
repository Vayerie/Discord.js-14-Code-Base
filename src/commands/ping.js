const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Ping the bot",
	async execute(client, message) {
		const msg = await message.channel.send(`Pinging...`);
		const embed = new EmbedBuilder()
			.setTitle("Pong!")
			.setDescription(
				`WebSocket ping is ${client.ws.ping
				}MS\nMessage edit ping is ${Math.floor(
					msg.createdAt - message.createdAt
				)}MS!`
			)
			.setColor(0x2b2d31);

		await msg.edit({
			embeds: [embed]
		});
	}
};
