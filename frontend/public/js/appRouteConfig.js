/**
 * app Route Config js 
 */

(function(){
  "use strict";

  angular.module('loginDashboardApp')

  .config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
     .state('app', {
        abstract: true,
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })
    .state('app.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginController'    
    })
    .state('app.signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'signupController'    
    })
    // Dashboard State 
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController'    
    });

  // Other wise set state 
  $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get("$state");
      $state.go('app.login');
  });

  
})

})();