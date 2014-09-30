var users = require('./User.js'),
    mocks = require('./mocks.js');

var User = users.User,
    users.init(mocks.users),
    mockUsers = mocks.users;

var socketHandle = function (socket) {
  socket.on('connect', function () {
    clearInterval(connect_interval);
    connect_interval = 0;
  });

  socket.on('arrive', function (data) {
    var user = new User(data, this);
    user.inWait();
    socket.broadcast.emit('usersOutside', {'usersOutside':users.getUsers('outside')});
  });

  socket.on('enter', function (data) {
    var
  });

  socket.emit('usersOutside', {'usersOutside':users.getUsers('outside');
  socket.emit('usersInside', {'usersInside':users.getUsers('inside');
};

module.exports = socketHandle;
