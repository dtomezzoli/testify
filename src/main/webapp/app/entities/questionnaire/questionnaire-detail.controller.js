(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('QuestionnaireDetailController', QuestionnaireDetailController);

    QuestionnaireDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Questionnaire', 'Question'];

    function QuestionnaireDetailController($scope, $rootScope, $stateParams, previousState, entity, Questionnaire, Question) {
        var vm = this;

        vm.questionnaire = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('testifyApp:questionnaireUpdate', function(event, result) {
            vm.questionnaire = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
