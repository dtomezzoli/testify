(function() {
    'use strict';
    angular
        .module('testifyApp')
        .factory('Reponse', Reponse);

    Reponse.$inject = ['$resource'];

    function Reponse ($resource) {
        var resourceUrl =  'api/reponses/:id';

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
