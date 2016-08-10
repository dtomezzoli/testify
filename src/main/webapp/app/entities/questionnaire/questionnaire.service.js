(function() {
    'use strict';
    angular
        .module('testifyApp')
        .factory('Questionnaire', Questionnaire);

    Questionnaire.$inject = ['$resource'];

    function Questionnaire ($resource) {
        var resourceUrl =  'api/questionnaires/:id';

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
