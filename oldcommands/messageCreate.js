const config = require('../config.json');
module.exports = {
	name: 'message',
	execute(client,message) {
		console.log(message)
		if(message.channel.id === 856125609104637963 && !message.author.bot){
			message.channel.send({ content: '<@!735090265064341605>', components: [] })
		}
	},
};