const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	permissions: {
		roles: ['Tickets'],
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('paypal')
		.setDescription('Provides Paypal payment.')
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('Amount due.')
				.setRequired(true)),
	async execute(client, interaction) {
		const amount = interaction.options.get('amount').value;
		interaction.reply({ content: 'Please send a payment of **' + amount + ' GBP** to: https://paypal.me/unitypayments \n**FEES** \n \nRemember to send this as friends / family, if not you will have to cover the fees. \nIf you are converting from another currency, you will have to cover the conversion fee. \n \nOnce paid, send us a screenshot, your first name or the transaction ID.', components: [] });
	},
};