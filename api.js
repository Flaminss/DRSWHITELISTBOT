const config = require('./config.json');
const { apicheckwhitelist } = require('./whitelisthandler.js');
const fs = require('fs');
var express = require("express");
const apikey = config.APIKey
const whitelistfiles = fs.readdirSync("./whitelists").filter((file) => file.endsWith(".json"));
var app = express();
const router = express.Router();
//const router = express.Router();
const bodyParser = require("body-parser");
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.post("/whitelists/:list", async function (req, res) {
	var params = req.params;
	var list = params.list
	if (!req.body) return res.json({ success: false, error: "Invalid Body" });
	if (apikey === req.body.APIKey) {
		if (String(list) == "DRSGo") list = "Vocovo"
		if (whitelistfiles.find(name => name = String(list) + '.json')) {
			var file = './whitelists/' + String(list) + '.json'
			var rawdata = fs.readFileSync(file);
			var data = await JSON.parse(rawdata);
			res.json({ success: true, data: data });
		} else {
			res.json({ success: false, error: "Invalid request, enquired whitelist doesn't exist." });
		}
	} else {
		res.json({ success: false, error: "Invalid API Key" });
	}

});

router.post("/licenses/:type/:ownerid/:groupid", async function (req, res) {
	var params = req.params;
	var type = params.type
	var ownerid = params.ownerid
	var groupid = params.groupid
	if (!req.body) return res.json({ success: false, error: "Invalid Body" });
	if (apikey === req.body.APIKey) {
		if(type == "player"){
			apicheckwhitelist(ownerid, "api", "all").then((whitelistresponse) => {
				if (whitelistresponse.success === false) return res.json({ error: `Failed fetch licenses: \`\`\`${whitelistresponse.error}\`\`\``, success: false })
				res.json({ success: true, data: {
					Player: whitelistresponse.response,
					Group: {}
				} });
			})
		} else {
			if(type == "group"){
				apicheckwhitelist(ownerid, "api", "all").then((whitelistresponse) => {
					if (whitelistresponse.success === false) return res.json({ error: `Failed fetch licenses: \`\`\`${whitelistresponse.error}\`\`\``, success: false })
					apicheckwhitelist(groupid, "api", "all").then((whitelistresponse2) => {
						if (whitelistresponse2.success === false) return res.json({ error: `Failed fetch licenses: \`\`\`${whitelistresponse2.error}\`\`\``, success: false })
						res.json({ success: true, data: {
							Player: whitelistresponse.response,
							Group: whitelistresponse2.response
						} });
					})
				})
			}
		}
	} else {
		res.json({ success: false, error: "Invalid API Key" });
	}

});

app.get("/", async function (req, res) {
	res.redirect('https://www.roblox.com/groups/12734419/Direct-Retail-Solutions#!/about')

});


app.use("/", router);

app.listen(2500);
console.log("Express started on port %d", 2500);

