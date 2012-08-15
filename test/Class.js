module('Class');

DCS.define('Person', {
    property: {
        name: '',
        lastname: '',
        age: 0
    },

    constructor: function(name, lastname) {
        this.name = name;
        this.lastname = lastname;
    },

    toString: function() {
        return 'Name: ' + this.name + ' Lastname: ' + this.lastname;
    }
});

DCS.define('Worker', {
    extend: 'Person',

    property: {
        jobTitle: ''
    },

    constructor: function(name, lastname, jobTitle) {
        this._super(name, lastname);
        this.jobTitle = jobTitle;
    },

    toString: function() {
        return this._super() + ' Job Title: ' + this.jobTitle;
    }
});


var p1 = new Person('foo', 'bar');
var w1 = new Worker('John', 'Doe', 'CEO');


test('basic class definition', function() {
    ok(p1, 'Instance defined');
    ok(p1.name !== undefined && p1.lastname !== undefined && 
       p1.age !== undefined, 'Instance variables defined correctly');
    ok(p1.name == 'foo' && p1.lastname == 'bar', 
       'Instance variables values correctly set');
    ok(p1.age === 0, 'Default value correctly set');
});

test('defined methods', function() {
    equal(p1.toString(), 'Name: foo Lastname: bar', 'toString method works');
});

test('getters/setters generation', function() {
    ok(p1.getName && p1.getLastname && p1.getAge, 'Getters generated correctly');
    ok(p1.setName && p1.setLastname && p1.setAge, 'Setters generated correctly');
    ok(p1.getName() == 'foo' && p1.getLastname() == 'bar', 'Getters worked');
    p1.setName('bar');
    p1.setLastname('foo');
    ok(p1.getName() == 'bar' && p1.getLastname() == 'foo', 'Setters worked');
});

test('inheritance', function() {
    ok(w1.getName && w1.getLastname && w1.setName && 
       w1.setLastname && w1.getAge && w1.setAge, 'Methods inherited correctly');    
    equal(w1.toString(), 'Name: John Lastname: Doe Job Title: CEO', 'Overriden method works');
});
