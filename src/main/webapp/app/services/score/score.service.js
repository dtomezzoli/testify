(function () {
    'use strict';

    angular
        .module('testifyApp')
        .factory('Score', Score);

    Score.$inject = ['$resource'];

    function Score ($resource) {
        var service = $resource('api/score/:id', { id: '@id'}, {
            'query': {method: 'POST'},
            'post': {
                method: 'POST',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'get': { method:'GET' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });

        return service;
    }
})();
