(function() {
    'use strict';

    angular
        .module('proceval')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    
    function stateConfig($stateProvider) {
    	
    	console.log ("testmgt.state");
        $stateProvider.state('proceval.testmgt', {
            url: '/testmgt/:qid',
            parent: 'app',       
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/proceval/testmgt/testmgt.html',
                    controller: 'testmgtController',
                    controllerAs : 'vm'
                }
            }
        });
        
        $stateProvider.state('proceval.score', {
            url: '/testmgt/score/:score/:scoreMax/:duration',
            parent: 'app',       
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/proceval/testmgt/score.html',
                    controller: 'scoreController',
                    controllerAs : 'vm'
                }
            }
        });
        
    }
})();