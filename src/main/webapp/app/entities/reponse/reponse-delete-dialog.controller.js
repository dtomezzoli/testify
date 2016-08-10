(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('ReponseDeleteController',ReponseDeleteController);

    ReponseDeleteController.$inject = ['$uibModalInstance', 'entity', 'Reponse'];

    function ReponseDeleteController($uibModalInstance, entity, Reponse) {
        var vm = this;

        vm.reponse = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Reponse.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
