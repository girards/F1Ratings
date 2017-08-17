angular.module('MyApp')
  .controller('AddRaceCtrl', function($scope, Track, Race, Rating) {
    Track.getTrack()
      .then(function(response) {
        $scope.tracks = response.data;
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    $scope.addRace = function() {
      Race.addRace($scope.race)
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
