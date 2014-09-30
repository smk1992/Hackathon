var express = require('express');
var app = express(),
    server = require('http').Server();

var io = require('socket.io')(server),
    sockets = require('./sockets.js');

server.listen(port);
io.on('connection', sockets);

