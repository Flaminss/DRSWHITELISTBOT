const { SlashCommandBuilder } = require('discord.js');
const { changeaccount, getrobloxid } = require('../rbxaccounthandler.js');
var fs = require("fs");
module.exports = {
	permissions: {
		roles: ['Head of Staff'],
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('claimblacklist')
		.setDescription('Claim blacklists a user.')
		.addStringOption(option =>
			option.setName('action')
				.setDescription('action')
				.setRequired(true)
				.addChoices(
					{
						name:" Add",
						value: "add"
					},
					{
						name:" Remove",
						value: "remove"
					}
				)
		)
		.addStringOption(option =>
			option.setName('user')
				.setDescription('Name/ID/Mention')
				.setRequired(true)),
	async execute(client, interaction) {

		changeaccount(interaction.guild.id).then((response) => {
			if (response == null) return interaction.reply({ content: 'Error: This guild has not been assigned a group/token.', components: [] })
			if (response.success == false) return interaction.reply({ content: `Failed to login to roblox account: \`\`\`${response.error}\`\`\``, components: [] })
			const username = interaction.options.get('user').value;
			const action = interaction.options.get('action').value;
			getrobloxid(username, interaction).then((moduleresponse) => {
				if (moduleresponse.success === false) return interaction.reply({ content: `\`\`\`${moduleresponse.error}\`\`\``, components: [] })
				const id = String(moduleresponse.user);
				const name = moduleresponse.name;
				var file = "./claimblacklist.json"
				let rawdata = fs.readFileSync(file);
				let data = JSON.parse(rawdata);
				if(action == "remove"){
					if (data[id]) {
						delete data[id]
					} else {
						return interaction.reply({ content: `\`\`\`User isn't blacklisted\`\`\``, components: [] })
					}
					const raw = JSON.stringify(data, null, 2);
					fs.writeFileSync(file, raw)
					return interaction.reply({ content: `Successfully unblacklisted \`\`\`(${id}) ${name}\`\`\``, components: [] })
				}else{
					if (data[id]) {
						return interaction.reply({ content: `\`\`\`User is already blacklisted\`\`\``, components: [] })
					} else {
						data[id] = true
					}
					const raw = JSON.stringify(data, null, 2);
					fs.writeFileSync(file, raw)
					return interaction.reply({ content: `Successfully blacklisted \`\`\`(${id}) ${name}\`\`\``, components: [] })
				}
				
				
			});

		});
	},
};