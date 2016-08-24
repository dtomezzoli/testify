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
        vm.duration = 0;
        
        vm.currentPage = 0;
        vm.questionCourante = {};
        vm.propositionsCourantes = [];
        vm.reponsesCourantes = [];
        vm.scoreUndefined = -99999;  // constantes
        
        vm.questions = dataFactory.getQuestionsByQuestionnaire ($stateParams.qid); 
        
        // init des scores
        vm.scores = [];
        for (var i=0; i < vm.questions.length; i++) {
        		var infoScore = {};
        		
        		infoScore.isValid = false;
        		infoScore.current = vm.scoreUndefined;
        		infoScore.max = vm.scoreUndefined;
        		infoScore.question_id = vm.questions[i].id;
        		vm.scores.push (infoScore);
        }
        
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
        
        
        vm.restoreResponses = function (index) {
    	  console.log ("testmgtController:restoreResponses:index=" + index);
    	  // restituer les réponses précédentes
    	  var qid = vm.questions [index].id;
    	  if (index >= 0 && index < vm.reponses.length) {
    		  vm.reponsesCourantes = vm.reponses[index].reponses;
    	  }
        }
        
        vm.saveResponses = function (index) {
      	  console.log ("testmgtController:saveResponses:index=" + index);
      	  // restituer les réponses précédentes
      	  var qid = vm.questions [0].id;
      	  if (index >= 0 && index < vm.reponses.length) {
      		vm.reponses[index].reponses = vm.reponsesCourantes;
      	  }
         }
       
        
        vm.setQuestion = function (index) {
    	  console.log ("testmgtController:setQuestion:index=" + index);
    	  vm.questionCourante = vm.questions[index];
    	  vm.propositionsCourantes = dataFactory.getReponsesByQuestion (vm.questionCourante.id);
    	 
    	  // restituer les réponses précédentes
    	  //vm.reponsesCourantes = [];
    	  vm.restoreResponses (index);
       }
          
        vm.releverScore = function() {
            console.log ("testmgtController:releverScore");     
           	// prendre en compte le score max
           	if (vm.propositionsCourantes.length > 0) {
           		// renseigner le score de la question
           		if (vm.scores [vm.currentPage].max == vm.scoreUndefined) {
           			// ras	
           			var scoreMax = 0;
           			for (var i=0; i < vm.propositionsCourantes.length;i++) {
           				var obj = vm.propositionsCourantes[i];
           				if (obj.score > 0)
           					scoreMax += obj.score;
           				}
           			vm.scores [vm.currentPage].max = scoreMax;
           			/*
           			console.log ("releverScore: INITMAX:INIT :" + vm.currentPage,
                			",isValid:" + vm.scores[vm.currentPage].isValid +
                			",current:" + vm.scores[vm.currentPage].current +
                			",max:" + vm.scores[vm.currentPage].max
                		);
                	*/
           			}
           	}
        }
        
       
        
        vm.validerChoix = function() {
        	console.log ("testmgtController:validerChoix");     
        	// prendre en compte
        	if (Array.isArray(vm.reponsesCourantes) == false || vm.reponsesCourantes.length == 0) {
        		// pas de reponse à la question
        		console.log ("validerChoix:Invalider le choix");
        		if (vm.scores [vm.currentPage].isValid == true) {
        			// annuler le choix courant
        			vm.scores [vm.currentPage].isValid = false;
        			vm.scores [vm.currentPage].current = vm.scoreUndefined;
        		} 
        		vm.reponsesCourantes = [];
        	} else {
        		if (vm.scores [vm.currentPage].isValid == true) {
        			// maj score courant
        			var scoreCourant = 0;
        			for (var i=0; i < vm.reponsesCourantes.length;i++) {
        				var obj = vm.reponsesCourantes[i];
        				scoreCourant += obj.score;
        			}
        			vm.scores [vm.currentPage].current = scoreCourant;
       				
        			console.log ("validerChoix:UPDATE: index:" + vm.currentPage,
        					",isValid:" + vm.scores[vm.currentPage].isValid +
        					",current:" + vm.scores[vm.currentPage].current +
        					",max:" + vm.scores[vm.currentPage].max
           				);
       			} else {
       				
       				// init du score
       				vm.scores [vm.currentPage].isValid = true
       				
       				var scoreCourant = 0;
       				for (var i=0; i < vm.reponsesCourantes.length;i++) {
       					var obj = vm.reponsesCourantes[i];
           				scoreCourant += obj.score;
       				}
       				vm.scores [vm.currentPage].current = scoreCourant;
       				 console.log ("validerChoix:INIT:: index:" + vm.currentPage,
            				",isValid:" + vm.scores[vm.currentPage].isValid +
            				",current:" + vm.scores[vm.currentPage].current +
            				",max:" + vm.scores[vm.currentPage].max
            			);
       			}
       	}
        vm.saveResponses (vm.currentPage);	
    }
    
        
       vm.questionSuivante = function() {
       	console.log ("testmgtController:questionSuivante");
       	
       	// change
       	vm.validerChoix ();
       	
       	vm.releverScore ();
       	
       	vm.currentPage=vm.currentPage+1;
       
       	vm.setQuestion (vm.currentPage);
       };
        
       
       vm.questionPrecedente = function() {
       	console.log ("testmgtController:questionPrecedente");
       	
    	// change
       	vm.validerChoix ();
       	
       	
       	vm.releverScore ();
       	
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
        
        	// change
           	vm.validerChoix ();
        	
        	// verifier le score
        	vm.releverScore ();
        	
        	// calculer le score
        	var score = 0;
        	var scoreMax = 0;
        	for (var i=0; i < vm.scores.length; i++) {
        		var infoScore = vm.scores[i];
        		scoreMax += infoScore.max;
         		if ( infoScore.isValid == true ) {
         			score += infoScore.current;
         		} else {
         			console.log ("testmgtController:Max Undefined " + i);
         		}
        	 }
        	var currentTime = new Date().getTime();
        	vm.duration = Math.floor((currentTime - vm.startTime)/60000);
     
        	$timeout(function() {
        		 $location.path('/testmgt/score/'+score+'/'+scoreMax+'/'+vm.duration);
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
        
        // Using splice and push methods to make use of 
        // the same "selections" object passed by reference to the 
        // addOrRemove function as using "selections = []" 
        // creates a new object within the scope of the 
        // function which doesn't help in two way binding.
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