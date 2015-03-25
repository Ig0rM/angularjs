emplApp.directive('myTableDirective', ['$timeout', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
          employees: '=staff'
        },
        controller: 'Tab2Controller',

        link: function(scope, element, attrs) {

          $timeout(function() { 

            scope.showComments = function(id){
                if (!element.find('#comments-' + id).is(':visible')){
                  element.find('#comments-' + id).slideDown(440);
                }else{
                  element.find('#comments-' + id).slideUp(440);
                }
              };

          });

        },
        templateUrl: 'js/tab2/table.html'
      };

}]);