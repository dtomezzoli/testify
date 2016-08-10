(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('ReponseController', ReponseController);

    ReponseController.$inject = ['$scope', '$state', 'Reponse'];

    function ReponseController ($scope, $state, Reponse) {
        var vm = this;
        
        vm.reponses = [];

        loadAll();

        function loadAll() {
            Reponse.query(function(result) {
                vm.reponses = result;
            });
        }
    }
})();
