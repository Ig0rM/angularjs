"use strict"
var emplApp = angular.module('emplApp', ['ui.router', 'ui.bootstrap']);
emplApp.config(['$stateProvider', function ($stateProvider){
  $stateProvider
    .state('index', {
      url: "",
      views: {
        "tab1": { 
          templateUrl: 'js/tab1/tab1.html',
          controller: 'Tab1Controller'
        },
        "rPanel": { 
          templateUrl: 'js/rPanel/rPanel.html',
          controller: 'RPanelController' 
        }
      }
    })
    .state('tab1', {
      url: "/tab1",
      views: {
        "tab1": { 
          templateUrl: 'js/tab1/tab1.html',
          controller: 'Tab1Controller'
        },
        "rPanel": { 
          templateUrl: 'js/rPanel/rPanel.html',
          controller: 'RPanelController' 
        }
      }
    })
    .state('tab2', {
      url: "/tab2",
      views: {
        "tab2": { 
          templateUrl: 'js/tab2/tab2.html',
          controller: 'Tab2Controller'
        },
        "rPanel": { 
          templateUrl: 'js/rPanel/rPanel.html',
          controller: 'RPanelController' 
        }
      }
    });

       
}]);

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

            // scope.changeText = function(newTeam){
            //   if( !(newTeam === undefined) ){ 
            //     element.find('#addTeamButton').removeClass('disabled');
            //     return true;
            //   }else{  
            //     element.find('#addTeamButton').addClass('disabled');
            //     return false; 
            //   }
            // };


          });

        },
        templateUrl: 'js/rPanel/accordion.html'
      };

}]);
emplApp.factory('employeesFactory', function ($http){
    var factory = {};
    var companies = {};
    var employees = {};
    var chosenCompany = 'first';

    this.getEmployees = function(){
      $http
        .get('data/staff.json')
        .then(function(res){
          employees = res.data; 
        });
    };

    this.getEmployees();

    this.companies = function(){
      return companies;
    };

    this.employees = function(){
      return employees;
    };

    this.addTeam = function(newTeam){
      companies[newTeam] = [];
    };

    this.choseCompany = function(company){
      chosenCompany = company;
    };

    this.getChosenCompany = function(){
      return chosenCompany;
    };

    return this;
});
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