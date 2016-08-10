(function() {
    'use strict';

    angular
        .module("evaluationOld")
        .controller("evaluationOldController", evaluationOldController);

    evaluationOldController.$inject=['$scope','dataFactory','$timeout','$location'];


    function evaluationOldController($scope,dataFactory,$timeout,$location){

        var vm =this;
        vm.counter = 5;
        var stopped;
        vm.countdown = function() {
            stopped = $timeout(function() {
                vm.counter--;
                vm.countdown();
                if(vm.counter===0){
                    $location.path("/")
                }
            }, 1000);
        };
        //vm.countdown();
        //vm.allData=dataFactory.allData;
        //vm.questions=dataFactory.questions();
        vm.themes=dataFactory.findThemes();
        //vm.categoryStarted=false;






    }

})();