(function() {
    'use strict';

    angular
        .module('testifyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('evaluation', {
            parent: 'entity',
            url: '/evaluation',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Evaluations'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/evaluation/evaluations.html',
                    controller: 'EvaluationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('evaluation-detail', {
            parent: 'entity',
            url: '/evaluation/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Evaluation'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/evaluation/evaluation-detail.html',
                    controller: 'EvaluationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Evaluation', function($stateParams, Evaluation) {
                    return Evaluation.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'evaluation',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('evaluation-detail.edit', {
            parent: 'evaluation-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/evaluation/evaluation-dialog.html',
                    controller: 'EvaluationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Evaluation', function(Evaluation) {
                            return Evaluation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('evaluation.new', {
            parent: 'evaluation',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/evaluation/evaluation-dialog.html',
                    controller: 'EvaluationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                debut: null,
                                fin: null,
                                score: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('evaluation', null, { reload: true });
                }, function() {
                    $state.go('evaluation');
                });
            }]
        })
        .state('evaluation.edit', {
            parent: 'evaluation',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/evaluation/evaluation-dialog.html',
                    controller: 'EvaluationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Evaluation', function(Evaluation) {
                            return Evaluation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('evaluation', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('evaluation.delete', {
            parent: 'evaluation',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/evaluation/evaluation-delete-dialog.html',
                    controller: 'EvaluationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Evaluation', function(Evaluation) {
                            return Evaluation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('evaluation', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
