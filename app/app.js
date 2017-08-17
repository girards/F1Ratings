angular.module('MyApp', ['ngRoute', 'satellizer', 'ui.bootstrap'])
  .config(function($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/tracks/add', {
        templateUrl: 'partials/addTrack.html',
        controller: 'AddTrackCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/tracks', {
        templateUrl: 'partials/tracks.html',
        controller: 'TrackCtrl'
      })
      .when('/tracks/:id', {
        templateUrl: 'partials/detailedTrack.html',
        controller: 'DetailedTrackCtrl'
      })
      .when('/tracks/:id/edit', {
        templateUrl: 'partials/editTrack.html',
        controller: 'EditTrackCtrl'
      })
      .when('/races', {
        templateUrl: 'partials/races.html',
        controller: 'RaceCtrl'
      })
      .when('/races/add', {
        templateUrl: 'partials/addRace.html',
        controller: 'AddRaceCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
