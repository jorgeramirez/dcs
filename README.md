# Dummy Class System (DCS)
Just a very simple/dummy class system for JavaScript. DCS lets you implement
OO programming in JavaScript with ease. DCS is influenced by the 
[Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) mechanism and a little bit in the 
Class System defined by [Ext JS](http://www.sencha.com/products/extjs/).


Example
-------

Defining a class in DCS is very straightforward, as the following code shows:

    DCS.define('Person', {
        property: {
            name: '',
            lastname: ''
        },

        constructor: function(name, lastname) {
            this.name = name;
            this.lastname = lastname;
        },

        toString: function() {
            return 'Name: ' + this.name + ' Lastname: ' + this.lastname;
        }
    });

and you can create an instance of this class by doing

    var p1 = new Person('foo', 'bar');

The config object (the second parameter of the `DCS.define` method) contains the 
methods and properties that will be part of the new class prototype, except for
the _property_ config object that you can use to specify default values for instance 
variables. The _property_ config also tells DCS to generate getters/setters 
for each instance variable specified in this object.

In the following example you can see that extending another class is easy:

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

As you can see, you can still have access to an overriden method by using
the `_super` reference, this reference have temporary access to its parent's
overriden method. And you create an instance of this subclass as usual

    var w1 = new Worker('John', 'Doe', 'CEO');


Build project from Git
----------------------
In order to build the project you need to install [UglifyJS](https://github.com/mishoo/UglifyJS)
then issue the following

    $ git clone git://github.com/jorgeramirez/dcs.git
    $ cd dcs/
    $ bash build.sh

The result will be inside build/ directory
