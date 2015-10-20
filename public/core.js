
var secondApp = angular.module('app', [
  'ngRoute'
]);

secondApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home/', {
        templateUrl: 'home.html',
        controller: 'FirstCtrl'
      }).
      when('/first/', {
        templateUrl: 'first.html',
        controller: 'SecondCtrl'
      }).
       when('/second/', {
        templateUrl: 'second.html',
        controller: 'ThirdCtrl'
      });


    
  }]);

secondApp.controller('FirstCtrl', function($scope, $http){
    $scope.goodName = {};
    //for (i =0; i <)
    $scope.goodUpdate = {};


    
    $http.get('/goods/')
        .success(function(data) {
            $scope.goods = data;
            
            console.log("first");
        })      
        .error(function(data) {
            console.log('Error: ' + data);
        });   

        $scope.createGood = function() {
         $http.post('/goods/', $scope.goodName)
             .success(function(data) {
                 $scope.goodName = {}; // clear the form so our user is ready to enter another
                 $scope.goods = data;
                 console.log(data);
             })
             .error(function(data) {
                 console.log('Error: ' + data);
             });
     };

     $scope.updateGood = function(id) {
        console.log("start")
        $http.put('/goods/'+id, $scope.goodUpdate)
            .success(function(data){
                $scope.goodUpdate = {};
                $scope.goods = data;
            })
            .error(function(data) {
                 console.log('Error: ' + data);
             });
     };

      $scope.deleteGood = function(id) {
        console.log("Test " + id)
        $http.delete('/goods/' + id)
            .success(function(data) {
                $scope.goods = data;
                console.log("It worked " + id);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.scream = function(name){
        console.log("This is" + name)
    }
});

          


secondApp.controller('SecondCtrl', function($scope, $http){
    console.log("First");
    $http.get('/first/')
         .success(function(data) {
            console.log(data)
             $scope.defaultdatas = data;
             //console.log(data[1].name);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });

});

secondApp.controller('ThirdCtrl', function($scope, $http){
    console.log("Third");
    $http.get('/second/')
         .success(function(data) {
            console.log(data)
             $scope.moredefaults = data;
             console.log(data)
             //console.log(data[1].name);
         })
         .error(function(data) {
             console.log('Error: ' + data);
         });
});
