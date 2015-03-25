emplApp.directive('myAccordionDirective', ['$timeout', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
          employees: '=staff',
          companies: '=workplace'
        },
        controller: 'RPanelController',
        link: function(scope, element, attrs) {

          $timeout(function() {

            scope.changeText = function(newTeam){
              if( !(newTeam === undefined) ){ 
                element.find('#addTeamButton').removeClass('disabled');
                return true;
              }else{  
                element.find('#addTeamButton').addClass('disabled');
                return false; 
              }
            };


          });

        },
        templateUrl: 'js/rPanel/accordion.html'
      };

}]);