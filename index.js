/*jshint esversion:6*/

var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

app.listen(8001, () => {
	console.log("Server started on port 8001");
});
