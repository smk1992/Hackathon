angular.module('Doorbell.services', [])


.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on : function (e, callback) {
      socket.on(e, function () {
        var args = arguments;
        $rootScope.apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    },

    emit: function (e, data, callback) {
      socket.emit(e, data, function () {
        var args = arguments;
        $rootScope.apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  }
});