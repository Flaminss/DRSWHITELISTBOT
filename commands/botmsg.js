const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	permissions: {
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('botmsg')
		.setDescription('Sends a message')
		.addStringOption(option =>
			option.setName('string')
				.setDescription('String to send')
				.setRequired(true)),
	async execute(client, interaction) {
		const string = interaction.options.get('string').value;
		interaction.channel.send({ content: string, embeds: []})
		interaction.reply({ content: `Sent Message`, embeds: [], ephemeral: true}).then(setTimeout(() => interaction.deleteReply(), 1000));
	},
};
