(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('EvaluationController', EvaluationController);

    EvaluationController.$inject = ['$scope', '$state', 'Evaluation'];

    function EvaluationController ($scope, $state, Evaluation) {
        var vm = this;
        
        vm.evaluations = [];

        loadAll();

        function loadAll() {
            Evaluation.query(function(result) {
                vm.evaluations = result;
            });
        }
    }
})();
