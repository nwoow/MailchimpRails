// app/assets/javascripts/app/app.js

'use strict';



// app/assets/javascripts/app/app.js

angular.module('popcornApp', [
  'ngRoute',
   'ngCookies',
  'popcornApp.controllers',
   'popcornApp.services',
   'popcornApp.directives'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/movie/:movie_id', 
    {
      templateUrl: '/templates/movie.html', 
      controller: 'MovieController'
    })
  .when('/user/:user_id', 
      {
        templateUrl: '/templates/profile.html', 
        controller: 'ProfileController'
      })
  .when('/login', 
      {
        templateUrl: '/templates/login.html', 
        controller: 'LoginController'
      })
    .when('/', 
      {
        controller: 'MoviesController',
        templateUrl: '/templates/movies.html'
      })
    .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
});

