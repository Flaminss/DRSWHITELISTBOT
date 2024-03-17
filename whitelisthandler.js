var fs = require("fs");
const cunts = require('./claimblacklist.json');
const Products = require('./Products.json');



const buttonexpire = 300000;

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

function callbackFunction(e) {
	console.log(e)
}

async function adduser(file, id, name) {
	if (cunts[id]) return { success: false, error: "ID Is blacklisted" }
	let rawdata = fs.readFileSync(file);
	let data = await JSON.parse(rawdata);
	if (data.Players[id]) return { success: false, error: "Player is already whitelisted" }
	data.Players[id] = name
	const raw = await JSON.stringify(data, null, 2);
	await fs.writeFileSync(file, raw)
	return {
		success: true
	}
}

async function checkwhitelist2(file, id, name) {
	let rawdata = fs.readFileSync(file);
	let data = await JSON.parse(rawdata);
	if (data.Groups[id]) return { success: true }
	if (data.Players[id]) return { success: true }
	/*data.Players[id] = name
	const raw = await JSON.stringify(data, null, 2);
	await fs.writeFileSync(file, raw)*/
	return {
		success: false
	}
}

async function addgroup(file, id, name) {
	if (cunts[id]) return { success: false, error: "ID Is blacklisted" }
	let rawdata = fs.readFileSync(file);
	let data = await JSON.parse(rawdata);
	if (data.Groups[id]) return { success: false, error: "Group is already whitelisted" }
	data.Groups[id] = name
	const raw = await JSON.stringify(data, null, 2);
	await fs.writeFileSync(file, raw)
	return {
		success: true
	}
}

async function remove(file, id) {
	let rawdata = fs.readFileSync(file);
	let data = await JSON.parse(rawdata);
	if (data.Players[id]) {
		delete data.Players[id]
	} else {
		if (data.Groups[id]) {
			delete data.Groups[id]
		} else {
			return { success: false, error: "Player/Group isnt whitelisted" }
		}
	}

	const raw = await JSON.stringify(data, null, 2);
	await fs.writeFileSync(file, raw)
	return {
		success: true
	}
}

async function returnshit(e){
	return e
}

module.exports = {
	async checkwhitelist(id, name, type) {
		try {
			if (type == "all") {
				var Sending = {}
				for (const Producti in Products) {
					checkwhitelist2(Products[Producti].JSON, id, name).then((response) => {
						Sending[Products[Producti].Name] = response.success
					})
				}
				return returnshit({success: true, response: Sending}).then((response) => {
					return response
				})
			} else {
				for (var Producti in Products) {
					var Data = Products[Producti]
					if (Data.Whitelist == type) {
						return checkwhitelist2(Data.JSON, id, name).then((response) => {
							return response
						})
					}
				}
			}

		} catch (err) {
			return {
				success: false,
				error: err,
			};
		}

	},

	async apicheckwhitelist(id, name, type) {
		try {
			if (type == "all") {
				var Sending = {}
				for (const Producti in Products) {
					checkwhitelist2(Products[Producti].JSON, id, name).then((response) => {
						Sending[Products[Producti].Whitelist] = response.success
					})
				}
				return returnshit({success: true, response: Sending}).then((response) => {
					return response
				})
			} else {
				for (var Producti in Products) {
					var Data = Products[Producti]
					if (Data.Whitelist == type) {
						return checkwhitelist2(Data.JSON, id, name).then((response) => {
							return response
						})
					}
				}
			}

		} catch (err) {
			return {
				success: false,
				error: err,
			};
		}

	},
	async appendwhitelist(id, name, type) {
		try {
			if (type == "all") {

			} else {

				for (var Producti in Products) {
					var Data = Products[Producti]
					if (Data.Whitelist == type) {
						return adduser(Data.JSON, id, name).then((response) => {
							return response
						})
					}
				}
			}

		} catch (err) {
			return {
				success: false,
				error: err,
			};
		}

	},

	async appendgroupwhitelist(id, name, type) {
		try {
			if (type == "all") {

			} else {
				for (var Producti in Products) {
					var Data = Products[Producti]
					if (Data.Whitelist == type) {
						return addgroup(Data.JSON, id, name).then((response) => {
							return response
						})
					}
				}
			}

		} catch (err) {
			return {
				success: false,
				error: err,
			};
		}

	},

	async removewhitelist(id, name, type) {
		try {
			if (type == "all") {

			} else {
				for (var Producti in Products) {
					var Data = Products[Producti]
					if (Data.Whitelist == type) {
						return remove(Data.JSON, id).then((response) => {
							return response
						})
					}
				}
			}

		} catch (err) {
			return {
				success: false,
				error: err,
			};
		}

	},

};
