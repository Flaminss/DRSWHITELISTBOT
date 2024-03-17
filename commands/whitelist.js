const { SlashCommandBuilder } = require('discord.js');
const { changeaccount, getrobloxid, getgroupinfo } = require('../rbxaccounthandler.js');
const { appendwhitelist, appendgroupwhitelist } = require('../whitelisthandler.js');
const { logaction } = require('../commandlog.js');
const Products = require('../Products.json');
var IntTable = []
for (const Producti in Products) {
	IntTable.push({ name: String(Products[Producti].ChoiceName), value: String(Producti) })
}
module.exports = {
	permissions: {
		roles: ['Tickets'],
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('whitelist')
		.setDescription('Whitelists a user.')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('type')
				.setRequired(true)
				.addChoices(
					{
						name: "Player",
						value: "player"
					},
					{
						name: "Group",
						value: "group"
					}
				)
		)
		.addStringOption(option =>
			option.setName('user')
				.setDescription('User/Group/ID')
				.setRequired(true))

		.addStringOption(option =>
			option.setName('whitelist')
				.setDescription('Item to purchase')
				.setRequired(true)
				.addChoices(...IntTable)),
	async execute(client, interaction) {

		changeaccount(interaction.guild.id).then((response) => {
			if (response == null) return interaction.reply({ content: 'Error: This guild has not been assigned a group/token.', components: [] })
			if (response.success == false) return interaction.reply({ content: `Failed to login to roblox account: \`\`\`${response.error}\`\`\``, components: [] })
			const username = interaction.options.get('user').value;
			const productid = interaction.options.get('whitelist').value;
			if (!Products[productid]) return interaction.reply({ content: `Error: Product not found.`, components: [] })
			const whitelist = Products[productid].Whitelist
			const productname = Products[productid].Name
			if (Products[productid].Guild !== interaction.guild.id) return interaction.reply({ content: `Error: Unable to handle ${productname} whitelist in this server.`, components: [] })

			const type = interaction.options.get('type').value;
			if (type === "player") {
				getrobloxid(username, interaction).then((moduleresponse) => {
					if (moduleresponse.success === false) return interaction.reply({ content: `\`\`\`${moduleresponse.error}\`\`\``, components: [] })
					const id = String(moduleresponse.user);
					const name = moduleresponse.name;

					appendwhitelist(id, name, whitelist).then((whitelistresponse) => {
						if (whitelistresponse.success === false) return interaction.reply({ content: `\`\`\`${whitelistresponse.error}\`\`\``, components: [] })
						logaction(client, interaction.member, "Whitelisted player " + String(id) + " " + name)
						interaction.reply({ content: 'Successfully whitelisted (' + String(id) + ") " + name, components: [] })
					});
				});
			}


			if (type === "group") {
				getgroupinfo(username, interaction).then((moduleresponse) => {
					if (moduleresponse.success === false) return interaction.reply({ content: `\`\`\`${moduleresponse.error}\`\`\``, components: [] })
					const name = moduleresponse.name;

					appendgroupwhitelist(username, name, whitelist).then((whitelistresponse) => {
						if (whitelistresponse.success === false) return interaction.reply({ content: `\`\`\`${whitelistresponse.error}\`\`\``, components: [] })
						logaction(client, interaction.member, "Whitelisted group " + String(username) + " " + name)
						interaction.reply({ content: 'Successfully whitelisted (' + username + ") " + name, components: [] })
					});
				});
			}
		});
	},
};
