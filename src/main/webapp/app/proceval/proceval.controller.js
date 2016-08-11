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
        
          
       
        
        var nombrePages = (vm.questionnaires.length % vm.pageSize == 0) ? Math.floor (vm.questionnaires.length / vm.pageSize)
        		: Math.floor (vm.questionnaires.length / vm.pageSize) + 1; 
 
        vm.nbPages = nombrePages;
        
        vm.choisirQuestionnaire=function (questionnaire) {
        	console.log ("procevalController:choisirQuestionnaire:" + questionnaire.id);
        };
        
        
    }

})();