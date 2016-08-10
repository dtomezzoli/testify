(function() {
    'use strict';

    angular
        .module('testifyApp')
        .controller('ReponseDetailController', ReponseDetailController);

    ReponseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Reponse', 'Question'];

    function ReponseDetailController($scope, $rootScope, $stateParams, previousState, entity, Reponse, Question) {
        var vm = this;

        vm.reponse = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('testifyApp:reponseUpdate', function(event, result) {
            vm.reponse = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
