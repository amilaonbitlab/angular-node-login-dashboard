/**
 * home Controller js 
 */
(function() {
	'use strict';
	angular.module('loginDashboardApp')

	.controller('dashboardController', ['$scope','$state','dashboardService',dashboardController]);

	function dashboardController($scope,$state,dashboardService){

        // call get dashboard data API  
        dashboardService.getDashboardData().success(function(data){            

         console.log(data);

        }).error(function(err){

         console.log(err);

        })
            
      }

})();