(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('ChoixReponseDetailController', ChoixReponseDetailController);

    ChoixReponseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ChoixReponse', 'Evaluation', 'Reponse'];

    function ChoixReponseDetailController($scope, $rootScope, $stateParams, previousState, entity, ChoixReponse, Evaluation, Reponse) {
        var vm = this;

        vm.choixReponse = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('testifyApp:choixReponseUpdate', function(event, result) {
            vm.choixReponse = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
