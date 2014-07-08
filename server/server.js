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


var check = true;
io.on('connection', function (socket) {        
  socket.on('newUser', function (data) {          
    var user = new User(data, this);    
    user.inWait();
    socket.broadcast.emit('usersOutside', {'usersOutside':users.outside});        
  });

  socket.on('connect', function () {
    console.log("is it funny?");
    clearInterval(connect_interval);
    connect_interval = 0;    
  });
    
  socket.emit('usersOutside', {'usersOutside':users.outside});
  socket.emit('usersInside', {'usersInside':users.inside}); 
});


var User = function (data, socket) {
  for (var key in data) {
    this[key] = data[key];
  } 

  this._socket = socket;
  this._isInsirde = false;
}

User.prototype.gotInisde = function () {
  var check = users.outside.indexOf(this);
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
  console.log("here");
}


