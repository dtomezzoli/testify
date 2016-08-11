(function() {
    'use strict';

    angular
        .module("proceval")
        .filter("startFrom", startFrom);

    
    function startFrom() {
    	
    	return startFromFilter;
    	
        function  startFromFilter (input, start) {
        	 if (!input || !input.length) { return; }
            start = +start;
            return input.slice(start);
        }
    }
})();

