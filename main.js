let app = angular.module("myApp",[require('angular-route')]);
window.host = "http://169.254.27.194:3000/";
app.controller("createController",["$scope","$http","$location","$timeout",($scope,$http,$location,$timeout)=>{
  $scope.save = (isValid)=>{
    let data = {
      id: $scope.id,
      name: $scope.name,
      address: $scope.address
    }
    console.log(isValid);
    if (isValid) {
      $http.post(host+"employees", data)
          .then((res)=>{
            if(res.statusText == "Created"){
              alert(res.statusText);
              $timeout(()=>{
                console.log($location);
                 $location.path("#/table");
              }, 1000);
            }
          },
          (error)=>{console.error(error);});
    }
  }
}]);
app.controller("editController",
  ["$scope","$http","$routeParams","$location","$timeout",
  ($scope,$http,$routeParams,$location,$timeout)=>{
  console.log($routeParams);
  if($routeParams.id){
    $http.get(host+"employees/"+$routeParams.id)
        .then((res)=>{
          let data = res.data;
          $scope.id = data.id;
          $scope.name = data.name;
          $scope.address = data.address;
          $scope.isDisabled = true;
        },
        (error)=>{console.error(error);});
  }
  $scope.save = (isValid)=>{
    let data = {
      id: $scope.id,
      name: $scope.name,
      address: $scope.address
    }
    console.log(isValid);
    if (isValid) {
      $http.put(host+"employees/"+$routeParams.id, data)
          .then((res)=>{
            if(res.statusText == "Created"){
              alert(res.statusText);
              $timeout(()=>{
                 $location.path("#/table");
              }, 1000);
            }
          },(error)=>{console.error(error);});
    }
  }
}]);
app.controller("deleteController",["$routeParams","$http","$location",($routeParams,$http,$location)=>{
  console.log($routeParams.id);
    if($routeParams.id){
      $http.delete(host+"employees/"+$routeParams.id)
          .then((res)=>{
            if(res.statusText == "OK" &&res.status == 200){
              alert(res.statusText);
              $location.path("#/table");
            }
          },(error)=>{console.error(error);});
    }
}])
app.controller("tableController",["$scope","$http",($scope,$http)=>{
  $http.get(host+"employees")
      .then((res)=>{$scope.employees = res.data},(error)=>{console.error(error);});
}]);
app.config(['$routeProvider',($routeProvider)=>{
  $routeProvider.
      when('/create', {
        templateUrl: 'partial/create.html',
        controller: 'createController'
      }).
      when('/edit/:id', {
        templateUrl: 'partial/create.html',
        controller: 'editController'
      }).
      when('/delete/:id', {
        templateUrl: 'partial/table.html',
        controller: 'deleteController'
      }).
      when('/table', {
        templateUrl: 'partial/table.html',
        controller: 'tableController'
      }).
      otherwise({
        redirectTo: '/table'
      });

}]);
