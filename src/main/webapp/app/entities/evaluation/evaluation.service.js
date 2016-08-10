(function() {
    'use strict';
    angular
        .module('testifyApp')
        .factory('Evaluation', Evaluation);

    Evaluation.$inject = ['$resource', 'DateUtils'];

    function Evaluation ($resource, DateUtils) {
        var resourceUrl =  'api/evaluations/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.debut = DateUtils.convertDateTimeFromServer(data.debut);
                        data.fin = DateUtils.convertDateTimeFromServer(data.fin);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
