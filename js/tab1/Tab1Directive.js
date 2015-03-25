emplApp.directive('myTagsinputDirective', ['$timeout', function ($timeout) {
    return {
        restrict: 'AEC',
        scope: {
          employees: '=staff'
        },
        controller: 'Tab1Controller',
        link: function(scope, element, attrs) {

          $timeout(function() { 
            // initialization of tagsmanager
            var tagM = element.find(".tm-input").tagsManager({
              typeahead: true,
              tagClass: 'newtags',
              replace: true,
              tagsContainer: '#tagField'
            });


            //when selected employee name from the list
            scope.onSelect = function ($item, $model, $label) {
              tagM.tagsManager('pushTag', $label);
              element.find('#refreshButton').removeClass('disabled');
            };

            //disable remove button when there are no tags
            element.off('click', '.tm-tag-remove').on('click', '.tm-tag-remove', function(){
              if(element.find('.tm-tag').length === 0){
                element.find('#refreshButton').addClass('disabled');
              }
            });

          });

        },
        templateUrl: 'js/tab1/tagsinput.html'
      };

}]);