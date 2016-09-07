(function() {
    'use strict';
    angular
        .module('testifyApp')
        .factory('ChoixReponse', ChoixReponse);

    ChoixReponse.$inject = ['$resource'];

    function ChoixReponse ($resource) {
        var resourceUrl =  'api/choix-reponses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
