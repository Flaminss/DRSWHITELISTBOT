
const fs = require('fs');
var express = require("express");

var app = express();



app.get("/", async function (req, res) {
	var rawdata = fs.readFileSync("script.txt",'utf8');
	res.send(rawdata)
});

app.listen(3000);
console.log("Express started on port %d", 3000);