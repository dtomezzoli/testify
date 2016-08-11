(function() {
    'use strict';

    angular
        .module("proceval")
        .factory("dataFactory", dataFactory);

    dataFactory.$inject = ['Questionnaire'];
    
    
    
    function dataFactory(Questionnaire){

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
        
       
        dataFactory.getQuestionnaires=function(){
        	console.log("dataFactory.getQuestionnaires");
        	
       
        	return dataFactory.allData.questionnaires;
        }
        
        return dataFactory;
    }
})();