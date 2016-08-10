(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('QuestionDetailController', QuestionDetailController);

    QuestionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Question', 'Reponse', 'Questionnaire'];

    function QuestionDetailController($scope, $rootScope, $stateParams, previousState, entity, Question, Reponse, Questionnaire) {
        var vm = this;

        vm.question = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('testifyApp:questionUpdate', function(event, result) {
            vm.question = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
