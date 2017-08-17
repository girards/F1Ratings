angular.module('MyApp')
.controller('RaceCtrl', function($scope, $routeParams, Track, Race, Rating) {
  $scope.races = {};
  Race.getRace()
  .then(function(response) {
    $scope.races = response.data;
  })
  .catch(function(response) {
    $scope.messages = {
      error: Array.isArray(response.data) ? response.data : [response.data]
    };
  })

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
  };

  $scope.ratingStates = [
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOff: 'glyphicon-off'}
  ];

  $scope.vote = function(race, rate) {
    Rating.addRating({rate: rate,
      race: race._id})
      .then(function(response) {
        $scope.messages = {
          success: [response.data]
        };
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    };
  });
