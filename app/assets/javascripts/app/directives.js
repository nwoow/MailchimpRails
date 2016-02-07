// app/assets/javascripts/app/directives.js

'use strict';

angular.module('popcornApp.directives', [])
.directive('userPanel', function() {
    return {
      restrict: 'A',
      templateUrl: '/templates/user_panel.html',
      controller: ["$scope", "UserService", 
                   function($scope, UserService) {

        $scope.$on('user:set', function(evt, currentUser) {
          $scope.currentUser = currentUser;
        });

        UserService.currentUser()
                       .then(function(currentUser) {
          $scope.currentUser = currentUser;
        });

        $scope.logout = function() {
          UserService.logout()
            .then(function() {
            $scope.currentUser = null;
          });
        };

      }]
    };
  })