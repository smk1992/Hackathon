var express = require('express');
var requestHandler = require('./requestHandler.js');
var port = 8080;
var app = express();
var server = require('http').Server();
var io = require('socket.io')(server);
server.listen(port);

var users = {inside:[{'username':'bob', 'contact':'bobo@gmail.com'},
                     {'username':'bob', 'contact':'bobo@gmail.com'},
                     {'username':'bob', 'contact':'bobo@gmail.com'}], outside:[]};

var sockets = []
io.on('connection', function (socket) {    
  //socket.emit('news', {hello: 'world'});
  sockets.push(socket);
  console.log("yo mama so FAT");
  socket.on('newUser', function (data) {      
    var user = new User(data, this);
    console.log("NEW USER", data, user.username, user.contact);
    user.inWait();
  });

  socket.emit('usersOutside', {'users':users.outside});
  socket.emit('usersInside', {'users':users.inside});
});




var User = function (data, socket) {
  for (var key in data) {
    this[key] = key[data];
  }
  this._socket = socket;
  this._isInside = false;
}

User.prototype.gotInisde = function () {
  var check = users.outside.indexOf(this)
  if (check !== -1) {
    users.inside.splice(check, 1);
  }

  this._isInside = true;
  users.inside.push(this);
}

User.prototype.inWait = function () {
  var check = users.inside.indexOf(this)
  if (check !== -1) {
    users.inside.splice(check, 1);
  }
  this._isInisde = false;
  users.outside.push(this);
}