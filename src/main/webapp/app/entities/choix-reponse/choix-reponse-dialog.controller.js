(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('ChoixReponseDialogController', ChoixReponseDialogController);

    ChoixReponseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ChoixReponse', 'Evaluation', 'Reponse'];

    function ChoixReponseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ChoixReponse, Evaluation, Reponse) {
        var vm = this;

        vm.choixReponse = entity;
        vm.clear = clear;
        vm.save = save;
        vm.evaluations = Evaluation.query();
        vm.reponses = Reponse.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.choixReponse.id !== null) {
                ChoixReponse.update(vm.choixReponse, onSaveSuccess, onSaveError);
            } else {
                ChoixReponse.save(vm.choixReponse, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('testifyApp:choixReponseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
