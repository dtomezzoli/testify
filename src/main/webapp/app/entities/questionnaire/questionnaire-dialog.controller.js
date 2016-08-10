(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('QuestionnaireDialogController', QuestionnaireDialogController);

    QuestionnaireDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Questionnaire', 'Question'];

    function QuestionnaireDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Questionnaire, Question) {
        var vm = this;

        vm.questionnaire = entity;
        vm.clear = clear;
        vm.save = save;
        vm.questions = Question.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.questionnaire.id !== null) {
                Questionnaire.update(vm.questionnaire, onSaveSuccess, onSaveError);
            } else {
                Questionnaire.save(vm.questionnaire, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('testifyApp:questionnaireUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
