(function() {
    'use strict';

    angular
    .module("proceval")
    .controller("scoreController" , scoreController);

    scoreController.$inject=['$scope','dataFactory','$timeout','$location','$stateParams'];
    
    function scoreController($scope,dataFactory,$timeout,$location,$stateParams){
    	
    	console.log ("scoreController::score:" + $stateParams.score+
    			",scoreMax:" + $stateParams.scoreMax + ",duration:"+ $stateParams.duration);
        
    	var vm =this;
        vm.score = $stateParams.score;
        vm.scoreMax = $stateParams.scoreMax;
        vm.duration = $stateParams.duration;
        
        vm.acquitterScore = function() {
        	console.log ("scoreController:acquitterScore");
        	/*
        	 * retour à la liste des questionnaire
        	 */
        	 $timeout(function() {
        		 $location.path('/proceval');
        	 });
        };
    }
    
    
    angular
        .module("proceval")
        .controller("testmgtController" , testmgtController);
    
    testmgtController.$inject=['$scope','dataFactory','$timeout','$location','$stateParams'];

    function testmgtController($scope,dataFactory,$timeout,$location,$stateParams){
    	
    	console.log ("testmgtController:" + $stateParams.qid);
        
    	var vm =this;
        
        vm.startTime = new Date().getTime(); // ms depuis 1970
        vm.questionnaire_id = $stateParams.qid;
        
        vm.currentPage = 0;
        vm.questionCourante = {};
        vm.propositionsCourantes = [];
        vm.reponsesCourantes = [];
        
        vm.score = 0;
        
        vm.questions = dataFactory.getQuestionsByQuestionnaire (vm.questionnaire_id); 
        
        // init reponses
        vm.reponses = [];
        for (var i=0; i < vm.questions.length; i++) {
    		var infoReponse = {};
    		infoReponse.question_id = vm.questions[i].id;
    		infoReponse.reponses = [];
    		vm.reponses.push (infoReponse);
        }
        
        if (vm.questions.length > 0 ){
        	vm.questionCourante = vm.questions [0];
        	vm.propositionsCourantes = dataFactory.getReponsesByQuestion (vm.questionCourante.id);
        }
       
        
        vm.releverScore = function() {
           console.log ("testmgtController:releverScore");
           
           // elaborer les paramètres
           return dataFactory.processScore (vm.reponsesCourantes);
        }
        
        vm.restoreResponses = function (index) {
    	  console.log ("testmgtController:restoreResponses:index=" + index);
    	  return;
    	  
    	  
    	  var qid = vm.questions [index].id;
    	  if (index >= 0 && index < vm.reponses.length) {
    		  vm.reponsesCourantes = vm.reponses[index].reponses;
    	  }
        }
        
        vm.saveResponses = function (index) {
      	  console.log ("testmgtController:saveResponses:index=" + index);
      	  return;
      	  
      	  var qid = vm.questions [0].id;
      	  if (index >= 0 && index < vm.reponses.length) {
      		vm.reponses[index].reponses = vm.reponsesCourantes;
      	  }
         }
       
        
        vm.setQuestion = function (index) {
    	  console.log ("testmgtController:setQuestion:index=" + index);
    	  vm.questionCourante = vm.questions[index];
    	  vm.propositionsCourantes = dataFactory.getReponsesByQuestion (vm.questionCourante.id);
    	 
    	  //vm.reponsesCourantes = [];
    	  vm.restoreResponses (index);
       }
          
        vm.validerChoix = function() {
        	console.log ("testmgtController:validerChoix");     
        	if (Array.isArray(vm.reponsesCourantes) == false || vm.reponsesCourantes.length == 0) {
        		vm.reponsesCourantes = [];
        	}
        	vm.saveResponses (vm.currentPage);	
        }
    
        
       vm.questionSuivante = function() {
       	console.log ("testmgtController:questionSuivante");
       	
       	vm.validerChoix ();
       
       	vm.currentPage=vm.currentPage+1;
       	vm.setQuestion (vm.currentPage);
       };
        
       
       vm.questionPrecedente = function() {
    	console.log ("testmgtController:questionPrecedente");
    	vm.validerChoix ();
       	vm.currentPage=vm.currentPage-1;
    	vm.setQuestion (vm.currentPage);
       };
       
       vm.abandonnerTest = function () {
    	   $timeout(function() {
      		 $location.path('/proceval');
      	 });
       }
       
       
        vm.finTest = function() {
        	console.log ("testmgtController:finTest");
        
        	var finishTime = new Date().getTime();
        	
        	
           	vm.validerChoix ();
           	
           	// construction des paramètres pour le service
            var lreponses = []; 
            for (var i=0; i < vm.questions.length; i++) {
        		var infoReponse = {};
        		infoReponse.questionId = vm.questions[i].id;
        		infoReponse.reponses = [];
        		lreponses.push (infoReponse);
            }
            for (var i=0; i < vm.reponsesCourantes.length; i++) {
        		var question_id = vm.reponsesCourantes[i].question_id;
        		for (var j=0; j < lreponses.length;j++) {
        			if (lreponses[j].questionId == question_id) {
        				lreponses[j].reponses.push (vm.reponsesCourantes[i].id);
        			}
        		}
            }
          
            
            vm.score = dataFactory.processScore ({id: vm.questionnaire_id}, lreponses);            
            //var eval = dataFactory.registerEvaluation (vm.questionnaire_id, vm.startTime, vm.finishTime, score);        	

        	var duration = Math.max(Math.floor((finishTime - vm.startTime)/60000),1);
        
        	$timeout(function() {
        		 $location.path('/testmgt/score/'+score+'/-1/'+duration);
        	 });
        	
        };
        
        
        Array.prototype.customIndexOf = function (obj, fromIndex) {
    		console.log ("testmgtController:customIndexOf" )
    		if (fromIndex == null) {
    			fromIndex = 0;
    		} else if (fromIndex < 0) {
    			fromIndex = Math.max(0, this.length + fromIndex);
    		}
    		for (var i = fromIndex, j = this.length; i < j; i++) {
    			if (this[i].id == obj.id)
    				return i;
    		}
    		return -1;
    	};
    	
        vm.multipleSelections = [];
        vm.addOrRemove = function (selectedItems, item, isMultiple) {
           var itemIndex = selectedItems.customIndexOf(item)
           var isPresent = (itemIndex > -1)
           if (isMultiple) {
              if (isPresent) {
                 selectedItems.splice(itemIndex, 1)
              } else {
                 selectedItems.push(item)
              }
           } else {
              if (isPresent) {
                 selectedItems.splice(0, 1)
              } else {
                 selectedItems.splice(0, 1, item)
              }
           }
        };
        
        
        
    }

})();