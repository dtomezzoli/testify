(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('CandidatDialogController', CandidatDialogController);

    CandidatDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Candidat'];

    function CandidatDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Candidat) {
        var vm = this;

        vm.candidat = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.candidat.id !== null) {
                Candidat.update(vm.candidat, onSaveSuccess, onSaveError);
            } else {
                Candidat.save(vm.candidat, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('testifyApp:candidatUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
