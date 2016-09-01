(function() {
    'use strict';
    angular
        .module("proceval")
        .controller("procevalController", procevalController);

    procevalController.$inject=['$scope','$timeout','$location', 'Questionnaire'];


    function procevalController($scope,$timeout,$location, Questionnaire){
    	
    	console.log ("procevalController");
        var vm =this;
       
        vm.questionnaires = Questionnaire.query ();
        vm.currentPage = 0;
        vm.pageSize = 3;
        
        vm.choisirQuestionnaire=function (questionnaire) {
        	console.log ("procevalController:choisirQuestionnaire:" + questionnaire.id);
        	 $timeout(function() {
        		 $location.path('/testmgt/'+questionnaire.id);
        	 });
        };     
          
        
    }

})();