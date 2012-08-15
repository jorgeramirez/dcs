/**
Dummy Class System (DCS)

Copyright (c) 2012 Jorge Ramírez <jorgeramirez1990 at gmail.com>. 

DCS is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

DCS is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with DCS.  If not, see <http ://www.gnu.org/licenses/>.
**/
(function(window) {
    window.DCS = {};
}(window));
/**
 * Defines the class system.
 *
 * @author Jorge Ramírez <jorgeramirez1990@gmail.com>
 **/
(function(DCS, window) {
    "use strict";
    
    var Class,
        define, generateMembers,
        generateNameMap, generateGetter, 
        generateSetter;

    // Base Class
    Class = DCS.Class = function() {};

    /**
     * @private
     * Generates the name map information. Used in the process
     * of method generation.
     *
     * @param {String} name The name of the property.
     * @return {Object} the map object
     **/
    generateNameMap = function(name) {
        var capitalize, map;

        capitalize = name.charAt(0).toUpperCase() + name.substr(1);
        map = {
            name: name,
            get: "get" + capitalize,
            set: "set" + capitalize
        };
        return map;
    };

    /**
     * @private
     **/
    generateGetter =  function(nameMap) {
        return function() { return this[nameMap.name]; }; 
    };

    /**
     * @private
     **/
    generateSetter = function(nameMap) {
        return function(value) { this[nameMap.name] = value; };
    };

    /**
     * @private
     * Generate methods for members of property object. Also
     * establish default values for instance variables.
     **/
    generateMembers = function(prototype, property) {
        var name, map;

        for(name in property){
            map = generateNameMap(name);
            prototype[map.get] = generateGetter(map);
            prototype[map.set] = generateSetter(map);
            // establish default values for instance variables
            prototype[map.name] = property[map.name];
        }
    };

    /**
     * Defines a new Class
     *
     * @param {String} className
     * @param {Object} config
     **/ 
    DCS.define = function(className, config) {
        var prototype, propertyCfg, parent,
            parentProto, initializing = false;
        
        parent = !!config.extend ? DCS.ClassManager.get(config.extend) : Class;
        parentProto = parent.prototype;
        propertyCfg = config.property || {};
       
        // Instantiate a base class (do not run the constructor). 
        // From http://ejohn.org/blog/simple-javascript-inheritance/
        initializing = true;
        prototype = new parent();
        initializing = false;
      
        delete config.extend;
        delete config.property;
        
        for(var propName in config){
            if(typeof config[propName] === "function" &&
               typeof prototype[propName] === "function"){
                // Overriden method
                prototype[propName] = (function(name, fn) {
                    return function() {
                        this._super = parentProto[name];
                        var result = fn.apply(this, arguments);
                        delete this._super;
                        return result;
                    };
                }(propName, config[propName]));
            }else{
                prototype[propName] = config[propName];
            } 
        }

        // Generate methods for members in config.property
        generateMembers(prototype, propertyCfg);
        
        // Create the constructor for the new Class. It uses the
        // enhanced version of the constructor.
        function newClass() {
            if(!initializing){
                prototype.constructor.apply(this, arguments);
            }
        }

        newClass.prototype = prototype;

        // Register it with the ClassManager
        DCS.ClassManager.register(className, newClass);
    };
}(DCS || {}, window));
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
