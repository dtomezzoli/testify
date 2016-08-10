(function() {
    'use strict';

    angular
        .module('testifyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('reponse', {
            parent: 'entity',
            url: '/reponse',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Reponses'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/reponse/reponses.html',
                    controller: 'ReponseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('reponse-detail', {
            parent: 'entity',
            url: '/reponse/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Reponse'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/reponse/reponse-detail.html',
                    controller: 'ReponseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Reponse', function($stateParams, Reponse) {
                    return Reponse.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'reponse',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('reponse-detail.edit', {
            parent: 'reponse-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reponse/reponse-dialog.html',
                    controller: 'ReponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Reponse', function(Reponse) {
                            return Reponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('reponse.new', {
            parent: 'reponse',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reponse/reponse-dialog.html',
                    controller: 'ReponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                contenu: null,
                                score: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('reponse', null, { reload: true });
                }, function() {
                    $state.go('reponse');
                });
            }]
        })
        .state('reponse.edit', {
            parent: 'reponse',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reponse/reponse-dialog.html',
                    controller: 'ReponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Reponse', function(Reponse) {
                            return Reponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('reponse', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('reponse.delete', {
            parent: 'reponse',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reponse/reponse-delete-dialog.html',
                    controller: 'ReponseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Reponse', function(Reponse) {
                            return Reponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('reponse', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
