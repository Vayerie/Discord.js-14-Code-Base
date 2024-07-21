const { ChannelType, EmbedBuilder } = require("discord.js");
const moment = require("moment");
const { client } = require("./index");

module.exports = async (message, title) => {
	const channel = await client.channels.fetch(client.config.bot.devlog);
	if (channel && channel.type === ChannelType.GuildText) {
		const embed = new EmbedBuilder()
			.setTitle(moment().format("YYYY/MM/DD - hh:mm:ss"))
			.setDescription(`\`\`\`\n[${title}] ${message}\`\`\``)
			.setFooter({
				text: "..."
			})
			.setColor(0x2b2d31);
		await channel.send({
			embeds: [embed]
		});
	}
};
