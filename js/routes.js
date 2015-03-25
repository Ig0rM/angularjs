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
