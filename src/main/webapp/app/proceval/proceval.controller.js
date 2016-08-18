(function() {
    'use strict';
    angular
        .module("proceval")
        .controller("procevalController", procevalController);

    procevalController.$inject=['$scope','dataFactory','$timeout','$location'];


    function procevalController($scope,dataFactory,$timeout,$location){
    	
    	console.log ("procevalController");
        var vm =this;
       
        vm.questionnaires = dataFactory.getQuestionnaires (); 
        vm.currentPage = 0;
        vm.pageSize = 3;
        
        vm.choisirQuestionnaire=function (questionnaire) {
        	console.log ("procevalController:choisirQuestionnaire:" + questionnaire.id);
        	 $timeout(function() {
        		 $location.path('/testmgt/'+questionnaire.id);
        	 });
        	console.log ("procevalController:choisirQuestionnaire:" + $location.path());
        };     
   
        
    }

})();