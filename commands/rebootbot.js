const { SlashCommandBuilder } = require('discord.js');
var fs = require("fs");

function sleep(ms) {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }

module.exports = {
	permissions: {
		users: [216703533460881409],
	},
	data: new SlashCommandBuilder()
		.setName('rebootbot')
		.setDescription('Reboots the bot .'),
	async execute(client, interaction) {
		interaction.reply({ content: 'Rebooting...', components: [] });
		sleep(100)
		let rawdata = fs.readFileSync("./memory.json");
		let data = await JSON.parse(rawdata);
		data.rebooted = true
		data.guild = interaction.guild.id
		data.channel = interaction.channel.id
		const raw = await JSON.stringify(data, null, 2);
		await fs.writeFileSync("./memory.json",raw)
		process.exit(0)
	},
};