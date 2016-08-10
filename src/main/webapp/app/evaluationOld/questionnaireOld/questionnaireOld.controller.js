(function() {
    'use strict';

    angular
        .module("evaluationOld")
        .controller("questionnaireOldController", questionnaireOldController);

    questionnaireOldController.$inject=['$scope','dataFactory','$timeout','$location','$stateParams'];


    function questionnaireOldController($scope,dataFactory,$timeout,$location,$stateParams) {
        var vm = this;
        vm.questions = dataFactory.findQuestionsByTheme($stateParams.theme);
        //FIXME faire un seul appel au questionnaire et extraire les questions
        vm.questionnaire=dataFactory.findQuestionnaireByTheme($stateParams.theme);
        vm.activeQuestion = 0;
        vm.score=0;
        vm.activeReponse=null;
        vm.error = false;
        vm.validerReponse=function(questionnaire,score) {
            if (score == null) {
                vm.error = true;

            }
            else {
                dataFactory.setQuestionnaireScore(questionnaire, score);
                vm.activeReponse = null;
                //vm.counter=5;
                if (vm.activeQuestion < vm.questions.length - 1) {
                    vm.activeQuestion++;

                }
                else {
                    $location.path('/evaluation');
                }
            }
        }
        vm.calculerScore=function(questionnaire,reponse){
            vm.activeReponse=reponse;

        }
        //compteur pour chaque question
        /*var vm =this;
        vm.counter = 5;
        var stopped;
        vm.countdown = function() {
            stopped = $timeout(function() {
                vm.counter--;
                vm.countdown();
                if(vm.counter===0){
                    vm.validerReponse(vm.questionnaire,0);

                }
            }, 1000);
        };
        vm.countdown();*/

    }





})();
