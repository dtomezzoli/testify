(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('CandidatDetailController', CandidatDetailController);

    CandidatDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Candidat'];

    function CandidatDetailController($scope, $rootScope, $stateParams, previousState, entity, Candidat) {
        var vm = this;

        vm.candidat = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('testifyApp:candidatUpdate', function(event, result) {
            vm.candidat = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
