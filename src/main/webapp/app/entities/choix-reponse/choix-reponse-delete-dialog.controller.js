(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('ChoixReponseDeleteController',ChoixReponseDeleteController);

    ChoixReponseDeleteController.$inject = ['$uibModalInstance', 'entity', 'ChoixReponse'];

    function ChoixReponseDeleteController($uibModalInstance, entity, ChoixReponse) {
        var vm = this;

        vm.choixReponse = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ChoixReponse.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
