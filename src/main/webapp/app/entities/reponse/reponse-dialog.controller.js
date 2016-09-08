(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('ReponseDialogController', ReponseDialogController);

    ReponseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Reponse', 'Evaluation', 'Question'];

    function ReponseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Reponse, Evaluation, Question) {
        var vm = this;

        vm.reponse = entity;
        vm.clear = clear;
        vm.save = save;
        vm.evaluations = Evaluation.query();
        vm.questions = Question.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.reponse.id !== null) {
                Reponse.update(vm.reponse, onSaveSuccess, onSaveError);
            } else {
                Reponse.save(vm.reponse, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('testifyApp:reponseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
