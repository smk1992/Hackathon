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

module.exports = User;
