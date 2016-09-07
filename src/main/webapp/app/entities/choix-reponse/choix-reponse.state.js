(function() {
    'use strict';

    angular
        .module('testifyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('choix-reponse', {
            parent: 'entity',
            url: '/choix-reponse',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ChoixReponses'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/choix-reponse/choix-reponses.html',
                    controller: 'ChoixReponseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('choix-reponse-detail', {
            parent: 'entity',
            url: '/choix-reponse/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'ChoixReponse'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/choix-reponse/choix-reponse-detail.html',
                    controller: 'ChoixReponseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'ChoixReponse', function($stateParams, ChoixReponse) {
                    return ChoixReponse.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'choix-reponse',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('choix-reponse-detail.edit', {
            parent: 'choix-reponse-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/choix-reponse/choix-reponse-dialog.html',
                    controller: 'ChoixReponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ChoixReponse', function(ChoixReponse) {
                            return ChoixReponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('choix-reponse.new', {
            parent: 'choix-reponse',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/choix-reponse/choix-reponse-dialog.html',
                    controller: 'ChoixReponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('choix-reponse', null, { reload: true });
                }, function() {
                    $state.go('choix-reponse');
                });
            }]
        })
        .state('choix-reponse.edit', {
            parent: 'choix-reponse',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/choix-reponse/choix-reponse-dialog.html',
                    controller: 'ChoixReponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ChoixReponse', function(ChoixReponse) {
                            return ChoixReponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('choix-reponse', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('choix-reponse.delete', {
            parent: 'choix-reponse',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/choix-reponse/choix-reponse-delete-dialog.html',
                    controller: 'ChoixReponseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ChoixReponse', function(ChoixReponse) {
                            return ChoixReponse.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('choix-reponse', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
