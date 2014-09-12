var scope;

(function() {
  
  var app = angular.module('App', []);

  var controller = app.controller('Controller', ['$scope', function($scope){
    scope=$scope;

    console.log("app.js is working")
    
    
  }]);

})();

