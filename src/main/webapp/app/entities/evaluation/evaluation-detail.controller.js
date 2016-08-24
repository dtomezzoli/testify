(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('EvaluationDetailController', EvaluationDetailController);

    EvaluationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Evaluation', 'User', 'Questionnaire'];

    function EvaluationDetailController($scope, $rootScope, $stateParams, previousState, entity, Evaluation, User, Questionnaire) {
        var vm = this;

        vm.evaluation = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('testifyApp:evaluationUpdate', function(event, result) {
            vm.evaluation = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
