angular.module('starter.controllers', ['LocalStorageModule'])

.controller('AppCtrl', function($scope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ListCtrl', function($scope,localStorageService) {

  if ( localStorageService.length() > 0 ) {
    console.log("localStorage is exist");
  } else {
    console.log("localStorage is not exist. Creating one now...");
    localStorageService.set("duitraya", []);
  }
  

  $scope.checked = false;
  /*
  var list = [
                {
                  "date" : 1111,
                  "data" : {
                    "name" : "Mak Long",
                    "value" : 10
                  }
                },
                {
                  "date" : 2222,
                  "data" : {
                    "name" : "Ayah Long",
                    "value" : 20
                  }
                },
                {
                  "date" : 3333,
                  "data" : {
                    "name" : "Ayah Ngah",
                    "value" : 30
                  }
                }
              ];
  */
  var list = localStorageService.get("duitraya");
  $scope.list = list;
  console.log($scope.list);

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

  $scope.doSomething = function(){
    console.log(toBeDeleted);
    for (var i = 0; i < toBeDeleted.length; i++) {
      $scope.list.splice([i], 1);
    }
    angular.forEach($scope.list, function (item) {
        item.selected = false;
    });
    $scope.checked = false;
  };
})

.controller('SingleCtrl', function($scope, $stateParams) {
  $scope.id = $stateParams.id;
})

.controller('AddCtrl', function($scope, $stateParams, localStorageService) {
  $scope.add = function(data){

    var newData = angular.toJson(data, true);
    console.log(newData);

    var pushThis = angular.fromJson(newData, true);
    console.log( pushThis );

    var localStorageData = localStorageService.get("duitraya");
    console.log( angular.isArray(localStorageData) );

    localStorageData.push(pushThis);
    console.log(localStorageData);
    
    localStorageService.set("duitraya", localStorageData);
    console.log( localStorageData );
  };
})

.controller('UpdateCtrl', function($scope, $stateParams) {
  $scope.add = function(data){
    console.log(data.name);
    console.log(data.value);
  };
});