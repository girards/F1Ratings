angular.module('MyApp')
  .controller('TrackCtrl', function($scope, $routeParams, Track) {
      Track.getTrack()
        .then(function(response) {
          $scope.tracks = response.data;
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
  });
