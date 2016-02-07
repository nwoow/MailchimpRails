// app/assets/javascripts/app/services.js
'use strict';

angular.module('popcornApp.services', [])
  .service('MoviesService', function() {
  this.movies = function(name) {
    var movies = [
        
       {
          youtubeId: "8Eg6yIwP2vs",
          title: "The Royal Tenenbaums",
          released: "2001",
          rated: "R",
          runningTime: 92,
          isFavorite: true,
          posterUrl: "http://i.imgur.com/np5EP3N.jpg"
        },
        {
          youtubeId: "lgo3Hb5vWLE",
          title: "Requiem for a Dream",
          released: "2000",
          rated: "R",
          runningTime: 102,
          isFavorite: false,
          posterUrl: "http://i.imgur.com/AYiim1H.jpg"
        },
        {
          youtubeId: "hsdvhJTqLak",
          title: "The Graduate",
          released: "1967",
          rated: "R",
          runningTime: 106,
          isFavorite: true,
          posterUrl: "http://i.imgur.com/gMwiOAD.jpg"
        },
        {
          youtubeId: "OtDQOF_pU8A",
          title: "8½",
          released: "1963",
          rated: "R",
          runningTime: 138,
          isFavorite: false,
          posterUrl: "http://i.imgur.com/QIPF827.jpg"
        },
        {
          youtubeId: "r_GCRFRcWxA",
          title: "The Big Lebowski",
          released: "1998",
          rated: "R",
          runningTime: 117,
          isFavorite: true,
          posterUrl: "http://i.imgur.com/AThCwkm.jpg"
        },
        {
          youtubeId: "KYz2wyBy3kc",
          title: "Toy Story",
          released: "1995",
          rated: "G",
          runningTime: 81,
          isFavorite: true,
          posterUrl: "http://i.imgur.com/NtnxM9p.jpg"
        }
        
      ];
    return movies;
  };
})
.service('UserService', 
   function($rootScope, $q, $cookieStore,$http) {
     var service = this;
     this._user = null;
     this.setCurrentUser = function(user) {
       service._user = user;
       $cookieStore.put('user', user);
       $rootScope.$broadcast("user:set", user);
     };
     this.currentUser = function() {
       var d = $q.defer();
       if(service._user) {
         d.resolve(service._user);
       } else if($cookieStore.get('user')) {
         service.setCurrentUser($cookieStore.get('user'));
         d.resolve(service._user);
       } else {
         d.resolve(null);
       }
       return d.promise;
     };

     this.signup = function(params) {
   var d = $q.defer();
   $http({
     url: '/users',
     method: 'POST',
     data: {
       user: params
     }
   }).success(function(response) { 
   	
     var user = response.data.user;
     user.auth_token = response.data.auth_token; // talk about this
     service.setCurrentUser(user);
     d.resolve(user);
   }).error(function(reason) { 
     d.reject(reason);
   });
   return d.promise;
 };  
 this.login = function(params) {
   var d = $q.defer();
   $http({
     url: '/users/sign_in',
     method: 'POST',
     data: {
       user: params
     }
   }).success(function(response) { 
     
     if(response.success) {
       var user = response.data.user;
       user.auth_token = response.data.auth_token; // talk about this
       service.setCurrentUser(user);
       d.resolve(user);
     } else {
       d.reject(response)
     }
   }).error(function(reason) { 
     d.reject(reason);
   });
   return d.promise;
 };
     this.logout = function() {
       var d = $q.defer();
       service._user = null;
       $cookieStore.remove('user');
       $rootScope.$broadcast("user:unset");
       d.resolve();
       return d.promise;
     };
  });