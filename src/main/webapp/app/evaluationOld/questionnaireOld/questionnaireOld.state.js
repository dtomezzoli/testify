(function(){
    'use strict';

    angular
        .module('evaluationOld')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('questionnaireOld', {
            parent: 'evaluationOld',
            url: '/questionnaireOld/{theme}',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/evaluationOld/questionnaireOld/questionnaireOld.html',

                }
            }
        });
    }

})();