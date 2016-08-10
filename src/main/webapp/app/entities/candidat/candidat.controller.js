(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('CandidatController', CandidatController);

    CandidatController.$inject = ['$scope', '$state', 'Candidat'];

    function CandidatController ($scope, $state, Candidat) {
        var vm = this;
        
        vm.candidats = [];

        loadAll();

        function loadAll() {
            Candidat.query(function(result) {
                vm.candidats = result;
            });
        }
    }
})();
