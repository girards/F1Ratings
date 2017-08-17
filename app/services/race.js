angular.module('MyApp')
  .factory('Race', function($http) {
    return {
      addRace: function(data) {
        return $http.post('/race', data);
      },
      getRace: function(data) {
        if (data) {
          return $http.get('/race', {
          params: {
              track_name: data
            }
          });
        }
        else
          return $http.get('/race', data);
      }
    };
  });
