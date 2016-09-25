/**
 * home Controller js 
 */
(function() {
	'use strict';
	angular.module('loginDashboardApp')

	.controller('dashboardController', ['$scope','$state','dashboardService','toastr','$cookies',dashboardController]);

	function dashboardController($scope,$state,dashboardService,toastr,$cookies){


        var token = $cookies.get('AUTH-TOKEN');
        // if not login redirect to login page 
        if(!token){            
            toastr.warning('Un Authorized, Pls Login', 'Warning');
            $state.go("app.login");
        }

        $scope.signOut = function(){            
            toastr.success('SignOut Success', 'Success');
            $cookies.remove('AUTH-TOKEN');
            $state.go("app.login");
        }

        // call get dashboard data API  
        dashboardService.getDashboardData().success(function(data){            

            console.log(data);

        }).error(function(err){

            console.log(err);

        })
            
      }

})();