/**
 * stock Ticker Service js 
 */
(function() {
    "use strict";
    angular.module('loginDashboardApp')

    .service('dashboardService', ['$http','constants', dashboardService]);

    function dashboardService($http,constants) {
        return {
            getDashboardData: function(){
                return $http.get(constants.SERVER_URL+ '/api/getDashboardData');
            }
        };
    }
})();