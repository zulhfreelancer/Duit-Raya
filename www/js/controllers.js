angular.module('starter.controllers', ['angularMoment'])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ListCtrl', function($scope,localStorageService, $timeout) {

  if ( localStorageService.length() > 0 ) {
    console.log("localStorage is exist");
  } else {
    console.log("localStorage is not exist. Creating one now...");
    localStorageService.set("duitraya", []);
  }
  
  $scope.checked = false;

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $timeout(function(){
      // when page loads, fetch localStorage data
      var list = localStorageService.get("duitraya");
      $scope.list = list;
      console.log($scope.list);

      var total = 0;
      for (var i = 0; i < list.length; i++) {
        total = total + list[i].value;
      }
      $scope.total = total;
    }, 100);
  });

  $scope.selectedCounter = 0;
  var toBeDeleted = [];

  $scope.change = function (v,k) {
      if (v.selected) {
          $scope.checked = true;
          $scope.selectedCounter++;
          console.log(k);
          toBeDeleted.push(k);
          console.log(toBeDeleted);
      } else {
          $scope.selectedCounter--;
          console.log(k);
          toBeDeleted.pop(k);
          console.log(toBeDeleted);
      }

      if ($scope.selectedCounter === 0) {
        $scope.checked = false;
      }
  };

  $scope.delete = function(){
    console.log(toBeDeleted);
    for (var i = 0; i < toBeDeleted.length; i++) {

      var localStorageData = localStorageService.get("duitraya");
      console.log( angular.isArray(localStorageData) );

      localStorageData.splice([i], 1);
      console.log(localStorageData);
      
      localStorageService.set("duitraya", localStorageData);
      console.log( localStorageData );

      $scope.list.splice([i], 1);
    }
    angular.forEach($scope.list, function (item) {
        item.selected = false;
    });
    $scope.checked = false;

    var total = 0;
    var list = localStorageService.get("duitraya");
      for (var d = 0; d < list.length; d++) {
        total = total + list[d].value;
      }
    $scope.total = total;
  };



})

.controller('AddCtrl', function($scope, $stateParams, localStorageService, $location) {
  $scope.data = {"date" : new Date()};

  $scope.add = function(data){

    if(isNaN(data.value)) {
      alert("Please enter valid number only");
    } else {
      var dataTemplate = data;

      var newData = angular.toJson(dataTemplate, true);
      console.log(newData);

      var pushThis = angular.fromJson(newData, true);
      console.log( pushThis );

      var localStorageData = localStorageService.get("duitraya");
      console.log( angular.isArray(localStorageData) );

      localStorageData.push(pushThis);
      console.log(localStorageData);
      
      localStorageService.set("duitraya", localStorageData);
      console.log( localStorageData );

      $location.path('/app');
    }

  };
})

.controller('UpdateCtrl', function($scope, $stateParams, localStorageService, $location) {
  $scope.data = {"date" : new Date()};

  var id = $stateParams.id;
  $scope.id = id;

  var localStorageData = localStorageService.get("duitraya");
  var singleData = localStorageData[$scope.id];
  $scope.data = singleData;

  $scope.update = function(data){
    console.log(data.name);
    console.log(data.value);
    console.log("ID: " + id);

    if(isNaN(data.value)) {
      alert("Please enter valid number only");
    } else {
      // Delete old data first
      var localStorageData = localStorageService.get("duitraya");
      console.log( angular.isArray(localStorageData) );

      localStorageData.splice(id, 1);
      console.log(localStorageData);

      localStorageService.set("duitraya", localStorageData);
      console.log( localStorageData );

      // Then recreate it
      var dataTemplate = data;

      var newData = angular.toJson(dataTemplate, true);
      console.log(newData);

      var pushThis = angular.fromJson(newData, true);
      console.log( pushThis );

      localStorageData = localStorageService.get("duitraya");
      console.log( angular.isArray(localStorageData) );

      localStorageData.push(pushThis);
      console.log(localStorageData);
      
      localStorageService.set("duitraya", localStorageData);
      console.log( localStorageData );

      $location.path('/app');
    }
  };
});