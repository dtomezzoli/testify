(function() {
    'use strict';

    angular
        .module('proceval')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    
    function stateConfig($stateProvider) {
    	
    	console.log ("proceval.state");
        $stateProvider.state('proceval', {
            url: '/proceval',
            parent: 'app',          
            data: {
                authorities: ['ROLE_CANDIDAT']
            },
            views: {
                'content@': {
                    templateUrl: '/app/proceval/proceval.html',
                    controller: 'procevalController',
                    controllerAs : 'vm'
                }
            }
        });
    }
})();
