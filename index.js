const config = require('./config.json');
const fs = require('fs');
const { Client, Collection, GatewayIntentBits  } = require('discord.js');
//var express = require("express");
//const apikey = config.APIKey
//const whitelistfiles = fs.readdirSync("./whitelists").filter((file) => file.endsWith(".json"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//var app = express();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}


/*app.post("/get/whitelists/:list", async function (req, res) {
	var qer = req.query;
	var apikeyt = qer.apikey;
	var params = req.params;
	var list = params.list
	if (apikey === apikeyt) {
		if (whitelistfiles.find(name => name = String(list) + '.json')) {
			var file = './whitelists/'+String(list)+'.json'
			var rawdata = fs.readFileSync(file);
			var data = await JSON.parse(rawdata);
			res.json({ success: true, data: data });
		} else {
			res.json({ success: false, error: "Invalid request, enquired whitelist doesn't exist." });
		}
	} else {
		res.json({ success: false, error: "Invalid API Key" });
	}

});*/



// Login to Discord with your client's token
client.login("YOUR TOKEN");

//app.listen(80);
//console.log("Express started on port %d", 80);