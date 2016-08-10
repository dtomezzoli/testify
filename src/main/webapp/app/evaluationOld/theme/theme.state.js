(function(){
    'use strict';

    angular
        .module('evaluationOld')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('evaluationOld', {
            parent: 'app',
            url: '/evaluationOld',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/evaluationOld/theme/theme.html',

                }
            }
        });
    }

})();