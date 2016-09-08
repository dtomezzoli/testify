(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('EvaluationDialogController', EvaluationDialogController);

    EvaluationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Evaluation', 'User', 'Questionnaire', 'Reponse'];

    function EvaluationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Evaluation, User, Questionnaire, Reponse) {
        var vm = this;

        vm.evaluation = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();
        vm.questionnaires = Questionnaire.query();
        vm.reponses = Reponse.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.evaluation.id !== null) {
                Evaluation.update(vm.evaluation, onSaveSuccess, onSaveError);
            } else {
                Evaluation.save(vm.evaluation, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('testifyApp:evaluationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.debut = false;
        vm.datePickerOpenStatus.fin = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
