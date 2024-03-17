const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	permissions: {
		roles: ['Tickets'],
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('cashapp')
		.setDescription('Provides Cashapp payment.')
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('Amount due.')
				.setRequired(true)),
	async execute(client, interaction) {
		const amount = interaction.options.get('amount').value;
		interaction.reply({ content: 'Please send a payment of **' + amount + ' GBP** to: http://cash.app/%C2%A3TH748583 \n \nOnce paid, please provide us with a screenshot, and wait for confirmation', components: [] });
	},
};