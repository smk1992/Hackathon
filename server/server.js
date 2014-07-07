var express = require('express');
var requestHandler = require('./requestHandler.js');
var port = 8080;
var app = express();
var server = require('http').Server();
var io = require('socket.io')(server);
server.listen(port);


io.on('connection', function (socket) {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function (data) {
    console.log(data);
  });
});






