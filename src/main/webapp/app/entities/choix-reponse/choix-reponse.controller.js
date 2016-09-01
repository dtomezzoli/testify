(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('ChoixReponseController', ChoixReponseController);

    ChoixReponseController.$inject = ['$scope', '$state', 'ChoixReponse'];

    function ChoixReponseController ($scope, $state, ChoixReponse) {
        var vm = this;
        
        vm.choixReponses = [];

        loadAll();

        function loadAll() {
            ChoixReponse.query(function(result) {
                vm.choixReponses = result;
            });
        }
    }
})();
