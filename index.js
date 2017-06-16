/*jshint esversion:6*/

var express = require('express');
var app = express();
var PORT = process.env.PORT || 9002;

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

app.use((req, res, next) => {
	res.status(404);
	res.send("The rabbit ate the file you were looking for.");
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(500);
	res.send("500 Error: Rabid Rabbits have infested the server.");
});

app.listen(PORT, () => {
	console.log("Server started on port " + PORT);
});
