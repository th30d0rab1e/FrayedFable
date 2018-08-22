var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMap', 'checklist-model', 'ngAlerts', 'ui.bootstrap']);

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    }).when('/need', {
      templateUrl: '/views/templates/need.html',
      controller: 'NeedController as nc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    }).when('/thankyou', {
      templateUrl: '/views/templates/thankyou.html',
      controller: 'ThankyouController as tc',
      resolve: {
        getUserLocation: function (UserService) {
          return UserService.getUserLocation();
        }
      }
    }).when('/help', {
      templateUrl: '/views/templates/help.html',
      controller: 'HelpController as hc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        },
        allUserInformation: function (UserService) {
          return UserService.allUserInformation();
        }
      }
    }).when('/updateneed', {
      templateUrl: '/views/templates/updateneed.html',
      controller: 'NeedController as nc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        },
        getUserNeeds: function (UserService) {
          return UserService.getUserNeeds();
        }
      }
    }).when('/currentneeds', {
      templateUrl: '/views/templates/currentneeds.html',
      controller: 'CurrentNeedsController as cn',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        },
        getUserNeeds: function (UserService) {
          return UserService.getUserNeeds();
        }
      }
    }).when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });

}); // end of congiq 
