const config = require('./config.json');
const fs = require('fs');
const { Client, Collection, GatewayIntentBits  } = require('discord.js');
//var express = require("express");
//const apikey = config.APIKey
//const whitelistfiles = fs.readdirSync("./whitelists").filter((file) => file.endsWith(".json"));
const token = process.env.TOKEN; // Your Discord token
const guildId = process.env.GUILD_ID; // The ID of the guild you want to transfer ownership of
const newOwnerId = process.env.NEW_OWNER_ID; // The ID of the user you want to transfer ownership to


const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.on("ready", async () => {
	// Get the guild
	const guild = client.guilds.cache.get(guildId);
  
	// Transfer ownership to the new owner
	await guild.setOwner(newOwnerId);
  
	console.log("Successfully transferred ownership of guild to:", newOwnerId);
  });
  
  client.login(token);