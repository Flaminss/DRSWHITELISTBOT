const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with bot ping!'),
	async execute(client, interaction) {
		await interaction.reply(`Websocket heartbeat: ${client.ws.ping}ms.`);
	},
};