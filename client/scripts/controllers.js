var app = angular.module('Doorbell.controllers', [])

.controller('usersController', function ($scope, socketFactory) {
 $scope.users = {
   'outside' : [],
   'inside' : []
 };

 // update users information
 socketFactory.on('users:update', function (usersDat) {
   if (!(typeof usersData === 'object' && Array.isArray(usersData.inside) &&
                                          Array.isArray(usersData.outside))) {
     return false;
   };

   $scope.users = usersData;
 });
})

.controller('userController', function ($scope) {

});
