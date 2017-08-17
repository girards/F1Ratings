angular.module('MyApp')
  .controller('AddTrackCtrl', function($scope, Track) {
    $scope.addTrack = function() {
      Track.addTrack($scope.track)
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
