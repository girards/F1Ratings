angular.module('MyApp')
  .factory('Track', function($http) {
    return {
      addTrack: function(data) {
        return $http.post('/track', data);
      },
      getTrack: function(data) {
        if (data) {
          return $http.get('/track', {
          params: {
              track_id: data
            }
          });
        }
        else
          return $http.get('/track', data);
      }
    };
  });
