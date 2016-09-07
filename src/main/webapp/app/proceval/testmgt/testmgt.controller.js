(function() {
    'use strict';

    angular
        .module("proceval")
        .controller("testmgtController" , testmgtController);
    
    testmgtController.$inject=['$scope','$timeout','$location','$stateParams', 'Question', 'Reponse', 'Score', '$http', '$q', 'Evaluation', 'Questionnaire', 'Principal', 'User', '$uibModal'];

    function testmgtController($scope,$timeout,$location,$stateParams, Question, Reponse, Score, $http, $q, Evaluation, Questionnaire, Principal, User, $uibModal){
    	
    	console.log ("testmgtController:" + $stateParams.qid);
        
    	var vm =this;
        
    	vm.testEncours = true;
        vm.startTime = new Date().getTime(); // ms depuis 1970
        vm.finishTime = null;
        vm.questionnaire_id = $stateParams.qid;
        
        vm.currentPage = 0;
        vm.questionCourante = {};
        vm.propositionsCourantes = [];
        vm.reponsesCourantes = [];
        
        // appel du service score
        vm.scoreParams = [];
                
        // creation de l' evaluation
        vm.evaluation = {
        		id: null,
        		debut: null,
        		fin: null,
        		score: null,
        		candidat: null,
        		questionnaire: null
        };
        
        
        Principal.identity().then(function(account) {
        	console.log ("testmgtController:Principal.identity=" + account.login);
        	vm.evaluation.candidat = User.get ({login: account.login});
        });
        vm.evaluation.questionnaire = Questionnaire.get ({id: $stateParams.qid});

        
        vm.reponses = [];
        Question.getByQuestionnaire ({id : vm.questionnaire_id}, function(data){
        	vm.questions = data;
        
        	// init reponses
        	for (var i=0; i < vm.questions.length; i++) {
        		var infoReponse = {};
        		infoReponse.question_id = vm.questions[i].id;
        		infoReponse.reponses = [];
        		vm.reponses.push (infoReponse);
        	}
        
        	if (vm.questions.length > 0 ){
        		vm.questionCourante = vm.questions [0];
        		vm.propositionsCourantes = Reponse.getByQuestion({id: vm.questionCourante.id});
        	}
       
        });
          
        var dialogOpts = {
        	    backdrop: true,
        	    keyboard: true, 	    
        	    templateUrl: 'app/proceval/testmgt/evaluation-cancel-dialog.html',
        	    controllerAs : 'vm',
        	    controller: ['$scope', '$uibModalInstance','scopeParent',
        	      function($scope, $uibModalInstance,scopeParent) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
        	    				var vm = this;
        	    				vm.confirm = function() {
        	                         //On fait appel à la fonction du scope parent qui permet de supprimer l'élément.
        	                         //On peut également faire appel à un service de notre application.
        	                         //scopeParent.confimAbandon();
        	             
        	                         //Fermeture de la fenêtre modale
        	                         $uibModalInstance.close();
        	                     };
        	                     
        	                     vm.cancel = function() {
        	                         // Appel à la fonction d'annulation.
        	                    	 $uibModalInstance.dismiss('cancel');
        	                     };
        	                 }
        	             ],    resolve: {
        	        scopeParent: function() {
        	            return $scope; //$scope; //On passe à la fenêtre modal une référence vers le scope parent.
        	        }
        	    }
        	};
        
  
        vm.restoreResponses = function (index) {
    	  //console.log ("testmgtController:restoreResponses:index=" + index);    	  
    	  var qid = vm.questions [index].id;
    	  if (index >= 0 && index < vm.reponses.length) {
    		  vm.reponsesCourantes = vm.reponses[index].reponses;
    	  }
        }
        
        vm.saveResponses = function (index) {
      	  //console.log ("testmgtController:saveResponses:index=" + index);
          if ( vm.reponsesCourantes.length > 0) {
        	  var qid = vm.questions [index].id;
        	  if (index >= 0 && index < vm.reponses.length) {
        		  vm.reponses[index].reponses = vm.reponsesCourantes;
        	  }
         }
        }
    
        vm.setQuestion = function (index) {
    	  //console.log ("testmgtController:setQuestion:index=" + index);
    	  vm.questionCourante = vm.questions[index];
    	  vm.propositionsCourantes = Reponse.getByQuestion({id: vm.questionCourante.id});
    	  //vm.reponsesCourantes = [];
    	  vm.restoreResponses (index);
       }
          
        vm.validerChoix = function() {
        	//console.log ("testmgtController:validerChoix");     
        	if (Array.isArray(vm.reponsesCourantes) == false || vm.reponsesCourantes.length == 0) {
        		vm.reponsesCourantes = [];
        	}
        	vm.saveResponses (vm.currentPage);	
        }
    
        
       vm.questionSuivante = function() {
       	//console.log ("testmgtController:questionSuivante");
       	vm.validerChoix ();       
       	vm.currentPage=vm.currentPage+1;
       	vm.setQuestion (vm.currentPage);
       };
        
       
       vm.questionPrecedente = function() {
    	//console.log ("testmgtController:questionPrecedente");
    	vm.validerChoix ();
       	vm.currentPage=vm.currentPage-1;
    	vm.setQuestion (vm.currentPage);
       };
       
       
       vm.abandonnerTest = function () {
    	   // check si reponses
    	   var needConfirmation = false;
    	       
    	   if (vm.reponsesCourantes.length != 0) {
    		   needConfirmation=true;  
    	   } else {
    		   for (var i=0; i < vm.reponses.length; i++) {
              		if (vm.reponses[i].reponses.length != 0){
              			needConfirmation = true;
              			break;
              		}
    		   }
    	   }
    	   
    	   if (needConfirmation) {
    		   	$uibModal.open(dialogOpts).result.then(function (){ 		   		
    		   		$timeout(function() {
    		   			$location.path('/proceval');
    		   			});
    		   	});
    	   } else {
    		   $timeout(function() {
		   			$location.path('/proceval');
		   			});
    	   }
       }
       
     
       
        vm.finTest = function() {
        	console.log ("testmgtController:finTest");
        
        	vm.finishTime = new Date().getTime();
        	
           	vm.validerChoix ();
        
           	if (vm.reponses.length == 0) {
           		// le questionnaire ne contient pas de question
           		console.warn ("Questionnaire vide.Merci de choisir un autre questionnaire");
           		return;
           	}
           	
           	// construction des paramètres pour le score
            var lreponses = []; 
            for (var i=0; i < vm.reponses.length; i++) {
        		if (vm.reponses[i].reponses.length != 0){
        			var infoRequete = {};
                	infoRequete.questionId = vm.reponses[i].question_id;
                	infoRequete.reponses = [];
                	
        			for (var j=0; j < vm.reponses[i].reponses.length; j++)
        			infoRequete.reponses.push (vm.reponses[i].reponses[j].id);
        			
        			lreponses.push (infoRequete);
        		}
        	}
            
           //Score.query(vm.scoreParams, function (data) {
           Score.save(lreponses, function (data) {
           		console.log ("Success Score.query :" + data.score);
           		vm.evaluation.score = data.score;
           
           		// completer la requete
           		vm.evaluation.debut = new Date(vm.startTime).toJSON ();
            	vm.evaluation.fin = new Date (vm.finishTime).toJSON();
            	        	
            	console.log ("Evaluation angular.stringufy:" + JSON.stringify (vm.evaluation));	
            	Evaluation.save (vm.evaluation);
            	
            	// présenter le score au candidat
            	// afficher le score au candidat
                vm.duration = Math.max(Math.floor((vm.finishTime - vm.startTime)/60000),1);           
                vm.testEncours = false;
           	});        
        	
        };
        
        vm.acquitterScore = function() {
        	console.log ("scoreController:acquitterScore");
        	/*
        	 * retour à la liste des questionnaire
        	 */
        	 $timeout(function() {
        		 $location.path('/proceval');
        	 });
        };
        
        
        
        
        
        Array.prototype.customIndexOf = function (obj, fromIndex) {
    		//console.log ("testmgtController:customIndexOf" )
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