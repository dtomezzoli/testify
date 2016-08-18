(function() {
    'use strict';

    angular
        .module("proceval")
        .factory("dataFactory", dataFactory);

    dataFactory.$inject = ['Questionnaire', 'Question', 'Reponse'];
    
    
    
    function dataFactory(Questionnaire, Question, Reponse){

        var dataFactory={
            allData:[]
        };
        
        
        // questionnaires
        var simu = false;
        if (simu) 
        dataFactory.allData =
        {
        	"questionnaires": [
             {"id":1,"theme":"java", "niveau":"débutant", "duree":30},
             {"id":2,"theme":"java", "niveau":"expert1", "duree":60},
             {"id":3,"theme":"java", "niveau":"expert2", "duree":60},
             {"id":4,"theme":"java", "niveau":"confirmé", "duree":60},
             {"id":5,"theme":"java", "niveau":"expert", "duree":60},
             {"id":6,"theme":"java", "niveau":"expert JEE", "duree":60},
             {"id":7,"theme":"java", "niveau":"expert SWING", "duree":60}
            ]
        } 
        else 
        dataFactory.allData.questionnaires = Questionnaire.query();
        
        //questions
        var simuQuestion = false;
        if (simuQuestion) 
        dataFactory.allData.questions =
        	[
        	    {id:1, enonce:"bases de données relationnelles", questionnaire_id:1},
                {id:2, enonce:"langages de programmation",questionnaire_id:1},
                {id:3, enonce:"langages objet",questionnaireid:1},
                
        	    {id:4, enonce:"bases de données relationnelles", questionnaire_id:2},
                {id:5, enonce:"langages de programmation",questionnaire_id:2},
                {id:6, enonce:"langages objet",questionnaire_id:2},
                
                {id:7, enonce:"bases de données relationnelles", questionnaire_id:3},
                {id:8, enonce:"langages de programmation",questionnaire_id:3},
                {id:9, enonce:"langages objet",questionnaire_id:3}
            ];
        else
        dataFactory.allData.questions = Question.query();
        
        
        
        //reponses
        var simuReponse = false;
        if (simuReponse) 
        dataFactory.allData.reponses =
        	[
        	 {id:1, contenu:"O2", score: -1, question_id:1}, 
             {id:2, contenu:"Cassandra", score: -1, question_id:1}, 
             {id:3, contenu:"DB2", score: -1, question_id:1}, 
             {id:4, contenu:"MySql", score: 1, question_id:1},
             {id:5, contenu:"Versant", score: 0, question_id:1},
             {id:6, contenu:"Oracle", score: 1, question_id:1},
             
             {id:7, contenu:"PHP", score: 1, question_id:2}, 
             {id:8, contenu:"Spring", score: -1, question_id:2},
             {id:9, contenu:"Angular", score: -1, question_id:2},
             {id:10, contenu:"GO", score: 1, question_id:2},
             {id:11, contenu:"Lisp", score: 1, question_id:2}, 
             
             {id:12, contenu:"Pascal", score: -1, question_id:3},
             {id:13, contenu:"Cobol", score: 1, question_id:3},
             {id:14, contenu:"Java", score: 1, question_id:3} 
             ];
        else
        dataFactory.allData.reponses = Reponse.query();  
        
        
       
        
        
        dataFactory.getQuestionnaires=function(){
        	console.log("dataFactory.getQuestionnaires");
        	return dataFactory.allData.questionnaires;
        }
      
           
        dataFactory.getQuestionnaire=function(id){
        	console.log("dataFactory.getQuestionnaire:" + id);
        	var questionnaire = {};
        	for(var i=0;i<dataFactory.allData.questionnaires.length;i++) {
                if(dataFactory.allData.questionnaires[i].id==id){
                	return dataFactory.allData.questionnaires[i];
                }	
        	}
        	return questionnaire;
        }

        
        dataFactory.getReponsesByQuestion=function(id){
        	console.log("dataFactory.getReponsesByQuestion:" + id);
        	
        	var lreponses = [];
        	
        	/*
        	 * 
        	 for(var i=0;i<dataFactory.allData.reponses.length;i++) {
        		
        		var question = dataFactory.allData.reponses[i].question;
        		
        		console.log("dataFactory.getReponsesByQuestion::QUESTIONS i:" +
              			i + ",question id:",
          				question.id + ",enonce:" + question.enonce 
          				);
        	}
        	*/
        	
        	for(var i=0;i<dataFactory.allData.reponses.length;i++) {
        		
        		var question = dataFactory.allData.reponses[i].question;
        		
                if(question.id==id){
                	var reponse = {};
                	
                	reponse.id = dataFactory.allData.reponses[i].id;
                	reponse.contenu = dataFactory.allData.reponses[i].contenu;
                	reponse.score = dataFactory.allData.reponses[i].score;
                	reponse.question_id=id;
                	
                	/*
                	console.log("dataFactory.getReponsesByQuestion::ADD i:" +
                  			i + ",reponse:",
              				reponse.id + ",contenu:" + reponse.contenu +
              				",score:" + reponse.score +
              				",question:", reponse.question_id);
                	  */
                	var nb = lreponses.push(reponse);
                }	
                
        	}
        	
        	/*
        	 for(var i=0;i<lreponses.length;i++) {
        		 console.log("dataFactory.getReponsesByQuestion::PRINT i:" +i + 
        				",reponse:",lreponses[i].id + 
        				",contenu:" + lreponses[i].contenu +
           				",score:" + lreponses[i].score +
           				",question:", lreponses[i].question_id);
        	}
        	*/
        	 
        	return lreponses;	
        }	
        
        dataFactory.getQuestionsByQuestionnaire=function(id){
        	console.log("dataFactory.getQuestionsByQuestionnaire:" + id);
        	
        	var lquestions = [];
        	for(var i=0;i<dataFactory.allData.questions.length;i++) {
        		
        		var questionnaire = dataFactory.allData.questions[i].questionnaire;
        		// question.id
                if(questionnaire.id==id){
                	var question = {};
                	
                	question.id = dataFactory.allData.questions[i].id;
                	question.enonce = dataFactory.allData.questions[i].enonce;
                	question.questionnaire_id = questionnaire.id;
                	
                	/*
                	console.log("dataFactory.getQuestionsByQuestionnaire::add i:" +
                  			i + ",question:",
              				question.id + ",ennonce:" + question.enonce +
              				",questionnaire:", question.questionnaire_id);
                	 */
                	var nb = lquestions.push(question);
                }	
                
        	}
        	
        	/*
        	  
        	 for(var i=0;i<lquestions.length;i++) {
        		console.log("dataFactory.getQuestionsByQuestionnaire:: i:" +
            			i + ",question:",
            			lquestions[i].id + ",ennonce:" + lquestions[i].enonce +
        				",questionnaire.id:" + lquestions[i].questionnaire_id);
        	}
        	*/
        	return lquestions;	
        }	
         
        
        
        return dataFactory;
        
    }
})();
