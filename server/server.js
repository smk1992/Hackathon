var express = require('express');
var requestHandler = require('./requestHandler.js');
var port = 8080;
var app = express();
var server = require('http').Server();
var io = require('socket.io')(server);
var User = require('./User.js');
server.listen(port);

var mockUsers = {
  inside:[
    {'username':'bob', 'contact':'bobo@gmail.com'},
    {'username':'bob', 'contact':'bobo@gmail.com'},
    {'username':'bob', 'contact':'bobo@gmail.com'}
  ],
  outside:[]
};

io.on('connection', function (socket) {
  socket.on('newUser', function (data) {
    var user = new User(data, this);
    user.inWait();
    socket.broadcast.emit('usersOutside', {'usersOutside':users.outside});
  });

  socket.on('connect', function () {
    clearInterval(connect_interval);
    connect_interval = 0;
  });

  socket.emit('usersOutside', {'usersOutside':mockUsers.outside});
  socket.emit('usersInside', {'usersInside':mockUsers.inside});
});

