(function() {
    'use strict';

    angular
        .module('testifyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('candidat', {
            parent: 'entity',
            url: '/candidat',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Candidats'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/candidat/candidats.html',
                    controller: 'CandidatController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('candidat-detail', {
            parent: 'entity',
            url: '/candidat/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Candidat'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/candidat/candidat-detail.html',
                    controller: 'CandidatDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Candidat', function($stateParams, Candidat) {
                    return Candidat.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'candidat',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('candidat-detail.edit', {
            parent: 'candidat-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/candidat/candidat-dialog.html',
                    controller: 'CandidatDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Candidat', function(Candidat) {
                            return Candidat.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('candidat.new', {
            parent: 'candidat',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/candidat/candidat-dialog.html',
                    controller: 'CandidatDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nom: null,
                                prenom: null,
                                email: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('candidat', null, { reload: true });
                }, function() {
                    $state.go('candidat');
                });
            }]
        })
        .state('candidat.edit', {
            parent: 'candidat',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/candidat/candidat-dialog.html',
                    controller: 'CandidatDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Candidat', function(Candidat) {
                            return Candidat.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('candidat', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('candidat.delete', {
            parent: 'candidat',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/candidat/candidat-delete-dialog.html',
                    controller: 'CandidatDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Candidat', function(Candidat) {
                            return Candidat.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('candidat', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
