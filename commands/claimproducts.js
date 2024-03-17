const { SlashCommandBuilder } = require('discord.js');
const { changeaccount, userownsasset, getrobloxidusername } = require('../rbxaccounthandler.js');
const { appendwhitelist, appendgroupwhitelist } = require('../whitelisthandler.js');
const { logaction } = require('../commandlog.js');
const Products = require('../Products.json');
var IntTable = []
for (const Producti in Products) {
	IntTable.push({name: String(Products[Producti].ChoiceName), value: String(Producti)})
}
const cunts = require('../claimblacklist.json');
function giverole(member,rolename) {
	var role = member.guild.roles.cache.find(role => role.name === rolename);
	//if (!role) return;
	member.roles.add(role);
	}
	
module.exports = {
	permissions: {
		roles: ['Verified'],
	},
	data: new SlashCommandBuilder()
		.setName('claimproducts')
		.setDescription('Automatically whitelists robux purchases')
		.addStringOption(option =>
			option.setName('product')
			.setDescription('Product To Claim')				
			.setRequired(true)
			.addChoices(...IntTable)),
	async execute(client, interaction) {

		changeaccount(interaction.guild.id).then((response) => {
			if (response == null) return interaction.reply({ content: 'Error: This guild has not been assigned a group/token.', components: [] })
			if (response.success == false) return interaction.reply({ content: `Failed to login to roblox account: \`\`\`${response.error}\`\`\``, components: [] })
			const member = interaction.member;
			const username = member.nickname || member.user.username;
			const product = Number(interaction.options.get('product').value);
			if(!Products[product]) return interaction.reply({ content: `Error: \`\`\`Product not found on our database.\`\`\``, components: [] })
			const productname = Products[product].Name
			if (Products[product].Guild !== interaction.guild.id) return interaction.reply({ content: `Error: Unable to claim ${productname} in this server.\n\nJoin the following server for this product: ${Products[product].Invite}`, components: [] })
			
			getrobloxidusername(username, interaction).then((moduleresponse) => {
				if (moduleresponse.success === false) return interaction.reply({ content: `\`\`\`${moduleresponse.error}\`\`\``, components: [] })
				const id = String(moduleresponse.user);
				if(cunts[id]) return interaction.reply({ content: `\`\`\`You are blacklisted from using this service.\`\`\``, components: [] })
				const name = moduleresponse.name;
				userownsasset(id, product, interaction).then((moduleresponse) => {
					if (moduleresponse.success === false) return interaction.reply({ content: `\`\`\`${moduleresponse.error}\`\`\``, components: [] })
					if (moduleresponse.response === false) return interaction.reply({ content: `You do not own: ${Products[product].Name}. If this is a mistake please make sure you have verified the correct account with bloxlink. \n \n https://www.roblox.com/catalog/${product}/redirect`, components: [] })
					appendwhitelist(id,name,Products[product].Whitelist).then((whitelistresponse) => {
						logaction(client,interaction.member,'Claimed: '+Products[product].Name)
						giverole(member,"Buyer")
						giverole(member,Products[product].Role)
						if (whitelistresponse.success === false) return interaction.reply({ content: `\`\`\`${whitelistresponse.error}\`\`\` \n \n Note: If your buyer and files roles were missing, they have now been restored.`, components: [] })

						interaction.reply({ content: "Your product has successfully been claimed, you can view your files at: <#"+String(Products[product].Channel)+"> \n \n Please read <#1092902827032068176> if you have any problems using your product.", components: [] })
					})
			});
				/*logaction(client,interaction.member,"Whitelisted player "+String(id)+" "+name)
				appendwhitelist(id,name,whitelist).then((whitelistresponse) => {
					if (whitelistresponse.success === false) return interaction.reply({ content: `\`\`\`${whitelistresponse.error}\`\`\``, components: [] })
					interaction.reply({ content: 'Successfully whitelisted ('+String(id)+") "+name, components: [] })
				});*/
			});


		});
	},
};