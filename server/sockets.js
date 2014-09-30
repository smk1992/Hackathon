var User = require('./User.js'),
    mocks = require('./mocks.js');

var mockUsers = mocks.users;

var socketHandle = function (socket) {
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
};


module.exports = socketHandle
