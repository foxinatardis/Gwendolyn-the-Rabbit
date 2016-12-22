/*jshint esversion:6*/

var express = require('express');
var app = express();
var PORT = process.env.PORT;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
	console.log("Server started on port " + PORT);
});
