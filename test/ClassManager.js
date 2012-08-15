module("ClassManager");

DCS.define('Animal', {
    property: {
        type: ''
    },

    constructor: function(type) {
        this.type = type;
    }
});

ClassManager = DCS.ClassManager;

test('register()', function() {
    var Foo = function(foo){ this.foo = foo; };
    ClassManager.register('Foo', Foo);
    equal(ClassManager.get('Foo'), Foo, "register method worked");
});

test('get()', function() {
    equal(ClassManager.get('Animal'), Animal, "get method worked");
});
