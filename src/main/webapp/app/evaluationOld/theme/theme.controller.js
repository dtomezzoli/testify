(function() {
    'use strict';

    angular
        .module("evaluationOld")
        .controller("themeController", themeController);

    themeController.$inject=['$scope','dataFactory','$timeout','$location'];


    function themeController($scope,dataFactory,$timeout,$location){

        var vm =this;

        vm.questionnaires=dataFactory.getQuestionnairesForTheme();



        vm.demarrerTest=function(theme){
            $location.path('/evaluationOld/questionnaireOld/'+theme);
        }

    }

})();