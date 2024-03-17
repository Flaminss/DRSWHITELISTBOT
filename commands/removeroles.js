const { SlashCommandBuilder } = require('discord.js');
const { logaction } = require('../commandlog.js');
const Products = require('../Products.json');
var IntTable = []
for (const Producti in Products) {
	IntTable.push({name: String(Products[Producti].ChoiceName), value: String(Producti)})
}
function giverole(member,rolename) {
var role = member.guild.roles.cache.find(role => role.name === rolename);
//if (!role) return;
member.roles.remove(role);
}

module.exports = {
	permissions: {
		roles: ['Tickets'],
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('removeroles')
		.setDescription('Removes buyer roles.')
		.addMentionableOption(option =>
			option.setName('user')
			.setDescription('User to give roles')
			.setRequired(true)
			)
		.addStringOption(option =>
			option.setName('role')
			.setDescription('Item to purchase')
			.setRequired(true)
			.addChoices(...IntTable)),
	async execute(client, interaction) {
		const productid = interaction.options.get('role').value;
		const memberid = interaction.options.get('user').value;
		const member = interaction.guild.members.cache.get(memberid)
		var name = member.nickname || member.username

		if (!Products[productid]) return interaction.reply({ content: `Error: Product not found.`, components: [] })
		const role = Products[productid].Role
		const productname = Products[productid].Name
		if (Products[productid].Guild !== interaction.guild.id) return interaction.reply({ content: `Error: Unable to handle ${productname} roles in this server.`, components: [] })


		var given = "Buyer\n"
		giverole(member,"Buyer")

		giverole(member,role)
		given = given + `${role}\n`
		
		logaction(client,interaction.member,'Removed '+ '<@' + member.id + '>' +' roles: \n\n'+ given)
		interaction.reply({ content: 'Removed '+ '<@' + member.id + '>' +' roles: \n\n'+ given, components: [] });
	},
};