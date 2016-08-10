(function() {
    'use strict';

    angular
        .module("evaluationOld")
        .factory("dataFactory", dataFactory);

    function dataFactory(){

        var dataFactory={
            allData:[]
        };


        dataFactory.allData =
        {
            "evaluation": {



                    "questionnaires": [
                        {
                            id:1,
                            "theme": "Java",
                             score:null,
                             image_url:"content/images/Java_logo.png",

                                "questions": [
                                    {

                                            "reponses": [
                                                {
                                                    score: 3,
                                                    "description": "Interprété"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Compilé"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Les deux"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Ni l'un ni l'autre"
                                                }
                                            ]
                                        ,
                                        "description": "Java est un langage…",

                                    },
                                    {

                                            "reponses": [
                                                {
                                                    score: -1,
                                                    "description": "Que la valeur de cet attribut est constante"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Que cet attribut n'est visible que dans la classe où il est défini"
                                                },
                                                {
                                                    score: -1,
                                                    "description": "Que cet attribut sera toujours passé par valeur"
                                                },
                                                {
                                                    score: 3,
                                                    "description": "Que cet attribut a une valeur unique pour toutes les instances de la classe"
                                                }

                                            ]
                                        ,
                                        "description": "Que signifie le mot clef 'static' associé à un attribut ?",

                                    },
                                    {

                                        "reponses": [
                                            {
                                                score: -1,
                                                "description": "Une classe abstraite ne peut être instanciée"
                                            },
                                            {
                                                score: -1,
                                                "description": "Une méthode abstraite n'a pas d'implémentation"
                                            },
                                            {
                                                score: 3,
                                                "description": "Une classe abstraite n'a pas forcément de classe fille"
                                            },
                                            {
                                                score: -1,
                                                "description": "Une classe abstraite doit contenir au moins une méthode abstraite"
                                            }

                                        ]
                                        ,
                                        "description": "Au sujet du mot clef 'abstract', quelle assertion est fausse ?",

                                    },
                                    {

                                        "reponses": [
                                            {
                                                score: -1,
                                                "description": "Parent p = new Child();"
                                            },
                                            {
                                                score: -1,
                                                "description": "myParent = myChild;"
                                            },
                                            {
                                                score: -1,
                                                "description": "myChild = myParent;"
                                            },
                                            {
                                                score: 3,
                                                "description": "myChild = (MyChild)myParent;"
                                            }

                                        ]
                                        ,
                                        "description": "Child est une classe héritant de la classe Parent. myChild et myParent sont des instances respectivement de Child et Parent. Quel code ne compile pas ?",

                                    }

                                ]
                            ,
                            "niveau": "EXPERT"
                        },
                        {
                            id:2,
                            "theme": "SQL",
                             score:null,
                             image_url:"content/images/sql.png",
                                "questions": [
                                    {

                                        "reponses": [
                                            {
                                                score: -1,
                                                "description": "Sans Qualification Libérale."
                                            },
                                            {
                                                score: 3,
                                                "description": "   Structured Query Language"
                                            },
                                            {
                                                score: -1,
                                                "description": "Super Query Langage"
                                            },
                                            {
                                                score: -1,
                                                "description": "Structured Qualified Langage"
                                            }
                                        ]
                                        ,
                                        "description": "Qu'appelle-t-on SQL?",

                                    },
                                    {

                                        "reponses": [
                                            {
                                                score: -1,
                                                "description": "Elle est un attribut spécifique qui n'existe nul part ailleurs. On dit primaire car elle est obligatoirement mise en premier."
                                            },
                                            {
                                                score: -1,
                                                "description": "Elle est un attribut qui montre un lien entre deux tables, une dépendance fonctionnelle."
                                            },
                                            {
                                                score: -1,
                                                "description": "Elle permet d'ouvrir la salle de cours."
                                            },
                                            {
                                                score: 3,
                                                "description" : "Elle permet d'identifier, de caractériser, sans équivoque chaque enregistrement de la table."
                                            }
                                        ]
                                        ,
                                        "description": "Quelle est la définition de la clé primaire ?",

                                    },
                                    {

                                        "reponses": [
                                            {
                                                score: -1,
                                                "description": "Elle correspond à un attribut d'une autre relation."
                                            },
                                            {
                                                score: -1,
                                                "description": "Elle n'est pas présente dans la relation."
                                            },
                                            {
                                                score: -1,
                                                "description": "Elle est facultative, elle ne présente pas d'intérêt."
                                            },
                                            {
                                                score: 3,
                                                "description": "Elle est un attribut qui montre un lien entre deux tables, une dépendance fonctionnelle."
                                            }
                                        ]
                                        ,
                                        "description": "Quelle est la définition de la clé étrangère ?",

                                    }
                                ],
                            "niveau": " Junior"
                        }
                    ]
                }

        };

        dataFactory.setQuestionnaireScore=function(questionnaire,score){
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++) {
                if(dataFactory.allData.evaluation.questionnaires[i].id===questionnaire.id){
                    dataFactory.allData.evaluation.questionnaires[i].score+=score;
                }
            }


        }

        dataFactory.getQuestionnairesForTheme=function(){

            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++){
                var totalScore=0;
                if(dataFactory.allData.evaluation.questionnaires[i].score!=null){
                    dataFactory.allData.evaluation.questionnaires[i].disabled=true;
                }
                else{
                    dataFactory.allData.evaluation.questionnaires[i].disabled=false;
                }
                dataFactory.allData.evaluation.questionnaires[i].totalScore=0;
                for(var j=0;j<dataFactory.allData.evaluation.questionnaires[i].questions.length;j++) {
                    for(var k=0;k<dataFactory.allData.evaluation.questionnaires[i].questions[j].reponses.length;k++) {
                        if (dataFactory.allData.evaluation.questionnaires[i].questions[j].reponses[k].score > 0)
                            totalScore += dataFactory.allData.evaluation.questionnaires[i].questions[j].reponses[k].score;
                    }
                }
                dataFactory.allData.evaluation.questionnaires[i].totalScore = totalScore;
            }

            return dataFactory.allData.evaluation.questionnaires;
        }

        dataFactory.findQuestionnaireByTheme=function(theme){
            var questionnaire={};
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++) {
                 if(dataFactory.allData.evaluation.questionnaires[i].theme===theme){
                     questionnaire= dataFactory.allData.evaluation.questionnaires[i];
                 }
            }
            return questionnaire;
        }
        dataFactory.findQuestionsByQuestionnaireId=function(id){
            var questions=[];
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++) {
                if(dataFactory.allData.evaluation.questionnaires[i].id===id){
                    questions[i]= dataFactory.allData.evaluation.questionnaires[i].questions;
                }
            }
            return questions;
        }
        dataFactory.findQuestionsByTheme=function(theme){
            var questions={};
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++) {
                if(dataFactory.allData.evaluation.questionnaires[i].theme===theme){
                    questions= dataFactory.allData.evaluation.questionnaires[i].questions;
                }
            }
            return questions;
        }
        dataFactory.findThemes=function(){
            var themes=[];
            for(var i=0;i<dataFactory.allData.evaluation.questionnaires.length;i++){
               themes[i]=(dataFactory.allData.evaluation.questionnaires[i].theme);
            }
            return themes;
        }



        return dataFactory;
    }
})();