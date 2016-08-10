(function() {
    'use strict';
    
    angular
        .module('proceval')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    
    function stateConfig($stateProvider) {
    	console.log ("reqmgt.state");
        $stateProvider.state('reqmgt', {
            url: '/proceval',
            parent: 'proceval',          
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: '/app/proceval/reqmgt/reqmgt.html',
                    controller: 'reqmgtController',
                    controllerAs : 'vm'
                }
            }
        });
    }
})();