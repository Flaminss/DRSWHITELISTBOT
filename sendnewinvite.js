const { SlashCommandBuilder } = require('discord.js');
const noblox = require('noblox.js');
const { changeaccount, testcookie } = require('../rbxaccounthandler.js');
const fs = require("fs");


module.exports = {
	permissions: {
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('sendnewinvite')
		.setDescription('dmnewinvite'),
	async execute(client, interaction) {
		interaction.reply({ content: 'Sending new invite to all members.', components: [] }).then(setTimeout(() => interaction.deleteReply(), 10000));
		var guild = interaction.guild
		/*guild.members
    .fetch()
    .then(members => members.forEach(member => {
        member
            .send("Hello there, if you haven't heard ThomasH's account has been deleted, and he currently does not have ownership of the discord server. We ask that you join this new server immediately, which will become active if the current server is disabled / deleted by discord. \n https://discord.gg/bSUWupxUMX")
            .catch(() => {
                console.error(`Failed to send ${member.user.tag} a message`)
            })
    }))*/
		interaction.guild.members.cache.forEach(member => { // Looping through each member of the guild.
			// Trying to send a message to the member.
			// This method might fail because of the member's privacy settings, so we're using .catch
			var str = `member.send("Hello there, if you haven't heard ThomasH's account has been deleted, and he currently does not have ownership of the discord server. We ask that you join this new server immediately, which will become active if the current server is disabled / deleted by discord. \n https://discord.gg/bSUWupxUMX \n \n ** THIS MESSAGE IS AUTOMATED, WE CANNOT RESPOND TO REPLIES FROM THIS DM.").catch(e => console.log("Couldn't DM member "+String(member.user.tag)))` 
			eval(str)
		});
	}
};