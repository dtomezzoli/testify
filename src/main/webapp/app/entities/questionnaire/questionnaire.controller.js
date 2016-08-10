(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('QuestionnaireController', QuestionnaireController);

    QuestionnaireController.$inject = ['$scope', '$state', 'Questionnaire'];

    function QuestionnaireController ($scope, $state, Questionnaire) {
        var vm = this;
        
        vm.questionnaires = [];

        loadAll();

        function loadAll() {
            Questionnaire.query(function(result) {
                vm.questionnaires = result;
            });
        }
    }
})();
