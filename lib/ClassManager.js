/**
 * DCS.ClassManager
 *
 * @author Jorge Ramírez <jorgeramirez1990@gmail.com>
 **/
(function(DCS, window) {
    "use strict";
    
    var Manager;

    DCS.ClassManager = Manager = {
        /**
         * @private
         **/
        maps: {
            nameToClass: {} // Class name to Class reference map.
        },

        /**
         * Retrieves a Class by its name
         * @param {String} name
         * @return {DCS.Class} class
         **/
        get: function(name) {
            return !!this.maps.nameToClass[name] ? this.maps.nameToClass[name] : null;
        },

        /**
         * Registers a new class by its name and
         * add it to the window object
         *
         * @param {String} name
         * @param {DCS.Class} class
         **/
        register: function(name, klass) {
            if(!!this.maps.nameToClass[name]){
                window.console.log("Warning: [DCS.ClassManager] Overriding an existing class");
            }
            this.maps.nameToClass[name] = window[name] = klass;
        }
    };
}(DCS || {}, window));
