'use strict';

describe('Controller Tests', function() {

    describe('ChoixReponse Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockChoixReponse, MockEvaluation, MockReponse;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockChoixReponse = jasmine.createSpy('MockChoixReponse');
            MockEvaluation = jasmine.createSpy('MockEvaluation');
            MockReponse = jasmine.createSpy('MockReponse');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'ChoixReponse': MockChoixReponse,
                'Evaluation': MockEvaluation,
                'Reponse': MockReponse
            };
            createController = function() {
                $injector.get('$controller')("ChoixReponseDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'testifyApp:choixReponseUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
