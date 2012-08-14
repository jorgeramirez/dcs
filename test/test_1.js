(function(DCS, window, console){
DCS.define('Person', {
    property: {
        name: '',
        lastname: '',
    },

    constructor: function(name, lastname) {
        this.name = name;
        this.lastname = lastname;
    },

    toString: function() {
        return "Name: " + this.name + " Lastname: " + this.lastname;
    }
});

console.log("Running Test 1");

var p1 = new Person("foo", "bar");
console.log([
    "toString() works?",
    (p1.toString() == "Name: foo Lastname: bar") ? "Yes" : "No"
].join(" "));

console.log([
    "Generated getters/setters exists?",
    (p1.getName !== undefined && p1.getLastname !== undefined && 
     p1.setName !== undefined && p1.setLastname !== undefined) ? "Yes" : "No"
].join(" "));
}(DCS, window, console));
