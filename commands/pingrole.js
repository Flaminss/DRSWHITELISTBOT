const { SlashCommandBuilder } = require('discord.js');
const noblox = require('noblox.js');
const { changeaccount } = require('../rbxaccounthandler.js');
const Discord = require('discord.js');

module.exports = {
	permissions: {
		roles: ['Tickets'],
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('pingrole')
		.setDescription('Pings a specified role.')
		.addStringOption(option =>
			option.setName('rolename')
				.setDescription('Name of role to ping.')
				.setRequired(true)),
	async execute(client, interaction) {
		const rolename = interaction.options.get('rolename').value;
		var role = interaction.guild.roles.cache.find(role => role.name === rolename);
		if(role){
			interaction.channel.send({ content: `<@&${role.id}>`, embeds: []})
			interaction.reply({ content: `Pinged ${rolename}`, embeds: [], ephemeral: true})
		}else{
			interaction.reply({ content: `Role not found.`, embeds: [], ephemeral: true})
		}
		
	},
};