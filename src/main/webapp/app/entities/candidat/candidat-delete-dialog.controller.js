(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('CandidatDeleteController',CandidatDeleteController);

    CandidatDeleteController.$inject = ['$uibModalInstance', 'entity', 'Candidat'];

    function CandidatDeleteController($uibModalInstance, entity, Candidat) {
        var vm = this;

        vm.candidat = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Candidat.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
