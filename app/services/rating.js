angular.module('MyApp')
  .factory('Rating', function($http) {
    return {
      addRating: function(data) {
        return $http.post('/rating', data);
      },
      getRating: function(data) {
        return $http.get('/rating', {
        params: {
            race: data
          }
        });
      }
    };
  });
