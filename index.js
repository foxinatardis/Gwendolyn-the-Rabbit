/*jshint esversion:6*/

var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/instructions', (req, res) => {
	res.sendFile(__dirname + '/instructions.html');
});

app.get('/about', (req, res) => {
	res.sendFile(__dirname + '/about.html');
});

app.listen(PORT, () => {
	console.log("Server started on port " + PORT);
});
