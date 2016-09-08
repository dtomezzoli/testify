'use strict';

describe('Controller Tests', function() {

    describe('Evaluation Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockEvaluation, MockUser, MockQuestionnaire, MockReponse;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockEvaluation = jasmine.createSpy('MockEvaluation');
            MockUser = jasmine.createSpy('MockUser');
            MockQuestionnaire = jasmine.createSpy('MockQuestionnaire');
            MockReponse = jasmine.createSpy('MockReponse');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Evaluation': MockEvaluation,
                'User': MockUser,
                'Questionnaire': MockQuestionnaire,
                'Reponse': MockReponse
            };
            createController = function() {
                $injector.get('$controller')("EvaluationDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'testifyApp:evaluationUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
