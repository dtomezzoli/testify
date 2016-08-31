(function() {
    'use strict';

    angular
        .module('testifyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('questionnaire', {
            parent: 'entity',
            url: '/questionnaire',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Questionnaires'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/questionnaire/questionnaires.html',
                    controller: 'QuestionnaireController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('questionnaire-detail', {
            parent: 'entity',
            url: '/questionnaire/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Questionnaire'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/questionnaire/questionnaire-detail.html',
                    controller: 'QuestionnaireDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Questionnaire', function($stateParams, Questionnaire) {
                    return Questionnaire.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'questionnaire',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('questionnaire-detail.edit', {
            parent: 'questionnaire-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questionnaire/questionnaire-dialog.html',
                    controller: 'QuestionnaireDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Questionnaire', function(Questionnaire) {
                            return Questionnaire.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('questionnaire.new', {
            parent: 'questionnaire',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questionnaire/questionnaire-dialog.html',
                    controller: 'QuestionnaireDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                theme: null,
                                categorie: null,
                                duree: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('questionnaire', null, { reload: true });
                }, function() {
                    $state.go('questionnaire');
                });
            }]
        })
        .state('questionnaire.edit', {
            parent: 'questionnaire',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questionnaire/questionnaire-dialog.html',
                    controller: 'QuestionnaireDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Questionnaire', function(Questionnaire) {
                            return Questionnaire.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('questionnaire', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('questionnaire.delete', {
            parent: 'questionnaire',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questionnaire/questionnaire-delete-dialog.html',
                    controller: 'QuestionnaireDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Questionnaire', function(Questionnaire) {
                            return Questionnaire.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('questionnaire', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
