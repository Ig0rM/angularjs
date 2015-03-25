emplApp.controller('Tab2Controller', ['$scope', '$location', 'employeesFactory', function ($scope, $location, employeesFactory) {
  $scope.companies = employeesFactory.companies();
  $scope.employees = employeesFactory.employees();
  

  //adds employees from table
  $scope.addFromTableByName = function(employee){

      var alreadyHave = false;
      //check if the team already has than employee
      $.each( $scope.companies[employeesFactory.getChosenCompany()], function( key, value ) {
        if(value.name === employee.name){
          alreadyHave = true;
        }
      });
      //if not, adds new one
      if(!alreadyHave){
        $scope.companies[employeesFactory.getChosenCompany()].push(employee);
      }

    }
}]);