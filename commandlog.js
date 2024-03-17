//const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');

function getUserFromMention(mention, interaction) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return interaction.guild.members.cache.get(mention);
	}
}

module.exports = {
	async logaction(client,member,message) {
		const channel = member.guild.channels.cache.find(channel => channel.name === "command-log")
		if(channel){
			channel.send({ content: '<@!'+String(member.id)+'> ('+member.id+') \n'+message, components: [] })
		}
	},
	async rawlog(member,message) {
		const channel = member.guild.channels.cache.find(channel => channel.name === "command-log")
		if(channel){
			channel.send({ content: message, components: [] })
		}
	},
};
