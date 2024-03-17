
var fs = require("fs");
module.exports = {
	name: 'interactionCreate',
	execute(client, member) {
		(async () => {
			let rawdata = fs.readFileSync("./clowns.json");
			let data = await JSON.parse(rawdata);
			if(data[String(member.id)]){
				const channel =  member.guild.channels.cache.find(channel => channel.name === "welcome")
				const role = member.guild.roles.cache.find(role => role.name === '🤡 Clown');
				member.roles.add(role);
				//channel.send({ content: '<@!'+String(member.id)+'> Just got re-clowned', components: [] })
			}
		})();

	},
};