/**
 * Defines the class system.
 *
 * @author Jorge Ramírez <jorgeramirez1990@gmail.com>
 **/
(function(DCS, window) {
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
     * Generate methods for members of property object
     **/
    generateMembers = function(prototype, property) {
        var name, map;

        for(name in property){
            map = generateNameMap(name);
            prototype[map.get] = generateGetter(map);
            prototype[map.set] = generateSetter(map);
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

        delete config.extend;
        delete config.property;
       
        // Instantiate a base class (do not run the constructor). 
        // From http://ejohn.org/blog/simple-javascript-inheritance/
        initializing = true;
        prototype = new parent();
        initializing = false;
        
        
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
