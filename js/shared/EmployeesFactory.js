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