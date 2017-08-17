angular.module('MyApp')
  .controller('DetailedTrackCtrl', function($scope, $routeParams, Track) {
    Track.getTrack($routeParams.id)
      .then(function(response) {
        $scope.track = response.data;
        $scope.trackEditUrl = "/tracks/" + $scope.track._id + "/edit"
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
  });
