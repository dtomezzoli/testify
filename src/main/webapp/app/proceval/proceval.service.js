(function() {
    'use strict';

    angular
        .module("proceval")
        .factory("dataFactory", dataFactory);

    function dataFactory(){

        var dataFactory={
            allData:[]
        };
        
        // questionnaires
        dataFactory.allData =
        {
        	"questionnaires": [
             {"id":12,"theme":"java", "niveau":"débutant", "duree":30},
             {"id":13,"theme":"java", "niveau":"expert", "duree":60}
            ]
        };
        
      
       
        dataFactory.getQuestionnaires=function(){
        	console.log("dataFactory.getQuestionnaires");
        	return dataFactory.allData.questionnaires;
        }
        
        return dataFactory;
    }
})();