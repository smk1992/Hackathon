var express = require('express');
var io = require('socket.io');
var requestHandler = require('./requestHandler.js');
var port = 8080;

var app = express.createServer();

app.listen(port);


io.on('connection', function (socket) {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function (data) {
    console.log(data);
  });
});






