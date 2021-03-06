var users = {
  'outside' : [],
  'inside' : []
}

var User = function (data, socket) {
  for (var key in data) {
    this[key] = data[key];
  }

  this._socket = socket;
  this._isInside = false;
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


// temporary function used to initilize users with mock data
var initializeUsers = function (data) {
  if (!(typeof data === 'object' && Array.isArray(data.inside) &&
                                    Array.isArray(data.outside))) {
    return;
  }

  users = data;
};

var getUsers = function (type) {
  return users[type] || users;
}

module.exports = {
  'User' : User,
  'initUsers' : initializeUsers,
  'getUsers' : getUsers
};
