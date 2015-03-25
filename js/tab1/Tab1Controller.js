emplApp.controller('Tab1Controller', ['$scope', '$location', 'employeesFactory', function ($scope, $location, employeesFactory) {
 
  $scope.companies = employeesFactory.companies();
  $scope.employees = employeesFactory.employees();

  //refresh button click, adds employes from tags
  $scope.refresh = function(){
    
    $scope.companies[employeesFactory.getChosenCompany()] = [];
    
    $('.tm-tag').each(function(){
      var self = this;
      var employees = employeesFactory.employees();

      _.each( employees, function( employee ) {
        if(employee.name == $(self).find('span').html()){
          $scope.companies[employeesFactory.getChosenCompany()].push(employee);
        }
      });

    });

  }
}]);