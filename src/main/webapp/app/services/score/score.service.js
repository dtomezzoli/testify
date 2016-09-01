(function () {
    'use strict';

    angular
        .module('testifyApp')
        .factory('Score', Score);

    Score.$inject = ['$resource'];

    function Score ($resource) {
        var service = $resource('api/score', {}, {
            'query': {
            	isArray: false,
            	url: 'api/score',
                method: 'POST',
                transformRequest : function (data) {                        
                	data = angular.toJson (data);                	
                    return data;
                },                
                //transformResponse: []
                transformResponse: function (data) {
                data = JSON.parse(data);
                    return data ;
                }
                
            },
            'save': {
            	isArray: false,
            	url: 'api/score',
                method: 'POST',
                transformResponse: function (data) {
                    data = angular.fromJson(data);                                    
                    return data;
                }
            },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });

        return service;
    }
})();
