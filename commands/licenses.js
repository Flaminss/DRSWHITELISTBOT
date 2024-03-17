const { SlashCommandBuilder } = require('discord.js');
const { changeaccount, getrobloxid, getgroupinfo } = require('../rbxaccounthandler.js');
const { checkwhitelist } = require('../whitelisthandler.js');
const Products = require('../Products.json');
module.exports = {
	permissions: {
		roles: ['Tickets', 'Junior Support Team'],
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('licenses')
		.setDescription('Lists a users licenses')
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
				.setRequired(true)),

	async execute(client, interaction) {

		changeaccount(interaction.guild.id).then((response) => {
			if (response == null) return interaction.reply({ content: 'Error: This guild has not been assigned a group/token.', components: [] })
			if (response.success == false) return interaction.reply({ content: `Failed to login to roblox account: \`\`\`${response.error}\`\`\``, components: [] })
			const username = interaction.options.get('user').value;

			/*if (!Products[productid]) return interaction.reply({ content: `Error: Product not found.`, components: [] })
			const whitelist = Products[productid].Whitelist
			const productname = Products[productid].Name
			if (Products[productid].Guild !== interaction.guild.id) return interaction.reply({ content: `Error: Unable to handle ${productname} whitelist in this server.`, components: [] })*/

			const type = interaction.options.get('type').value;
			if (type === "player") {
				getrobloxid(username, interaction).then((moduleresponse) => {
					if (moduleresponse.success === false) return interaction.reply({ content: `\`\`\`${moduleresponse.error}\`\`\``, components: [] })
					const id = String(moduleresponse.user);
					const name = moduleresponse.name;
					checkwhitelist(id, name, "all").then((whitelistresponse) => {
						if (whitelistresponse.success === false) return interaction.reply({ content: `Failed fetch licenses: \`\`\`${response.error}\`\`\``, components: [] })
						var array = []
						for (var License in whitelistresponse.response) {
							var e = {}
							e.name = License
							if(whitelistresponse.response[License]){
								e.value = "✅ Whitelisted"
							}else{
								e.value = "❌ Not Whitelisted"
							}
							array.push(e)
						}
						var sending = [
							{
								"type": "rich",
								"title": `${name}`,
								"description": `Licenses:`,
								"color": 0xff4000,
								"fields": array
							}
						]

						interaction.reply({ content: "Results:", components: [], embeds: sending })
					});
				});
			}


			if (type === "group") {
				getgroupinfo(username, interaction).then((moduleresponse) => {
					if (moduleresponse.success === false) return interaction.reply({ content: `\`\`\`${moduleresponse.error}\`\`\``, components: [] })
					const name = moduleresponse.name;
					checkwhitelist(username, name, "all").then((whitelistresponse) => {
						if (whitelistresponse.success === false) return interaction.reply({ content: `Failed fetch licenses: \`\`\`${response.error}\`\`\``, components: [] })
						var array = []
						for (var License in whitelistresponse.response) {
							var e = {}
							e.name = License
							if(whitelistresponse.response[License]){
								e.value = "✅ Whitelisted"
							}else{
								e.value = "❌ Not Whitelisted"
							}
							array.push(e)
						}
						var sending = [
							{
								"type": "rich",
								"title": `${name}`,
								"description": `Licenses:`,
								"color": 0xff4000,
								"fields": array
							}
						]

						interaction.reply({ content: "Results:", components: [], embeds: sending })
					});
				});
			}
		});
	},
};