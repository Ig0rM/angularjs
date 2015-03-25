emplApp.controller('RPanelController', ['$scope', '$location', 'employeesFactory', function ($scope, $location, employeesFactory) {
  $scope.companies = employeesFactory.companies();
  $scope.employees = employeesFactory.employees();
   

  
  //adds new team
  $scope.addTeam = function(newTeam){
    employeesFactory.addTeam(newTeam);
  };

  //chose company to add employees
  $scope.choseCompany = function(company){
    var tagM = $(".tm-input").tagsManager({
      typeahead: true,
      tagClass: 'newtags',
      replace: true,
      tagsContainer: '#tagField'  
    });

    tagM.tagsManager('empty');
    employeesFactory.choseCompany(company);

    $.each( $scope.companies[company], function( key, value ) {
      tagM.tagsManager('pushTag', value.name);
    });
   
    if($scope.companies[company]){
      $('#refreshButton').removeClass('disabled');
    }
  }

  //check name of the team
  $scope.teamNamePattern = (function() {
      var regexp = /^[a-z0-9\s]+$/;
      return {
        test: function(value) {

            if( regexp.test(value) ){ 
            
              $('#addTeamButton').removeClass('disabled');
              return true;
            }
            else{  
            
              $('#addTeamButton').addClass('disabled');
              return false; 
            }
        }
      };
    })();

    //delete employee from the team
    $scope.delEmployee = function(employeeName){
      var index;

      $.each( $scope.companies[employeesFactory.getChosenCompany()], function( key, value ) {
          if(value.name == employeeName){
             index = $scope.companies[employeesFactory.getChosenCompany()].indexOf(value);
          }
      });

      $scope.companies[employeesFactory.getChosenCompany()].splice(index, 1);

      angular.element('.tm-tag').each(function(){
        if(angular.element(this).find('span').html() == employeeName){
            angular.element(this).find('a').triggerHandler('click');
        }
      });
    };

    //adds teams to the accordeon
    $scope.$parent.isopen = ($scope.$parent.default === $scope.item);
    $scope.$watch('isopen', function (newValue, oldValue, $scope) {
        $scope.$parent.isopen = newValue;
    });
}]);