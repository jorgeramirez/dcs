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
        return this._super() + " Job Title: " + this.jobTitle;
    }
});

console.log("Running Test 2");

var w1 = new Worker("John", "Doe", "CEO");
console.log([
    "toString() works?",
    (w1.toString() == "Name: John Lastname: Doe Job Title: CEO") ? "Yes" : "No"
].join(" "));

console.log([
    "Inherited getters/setters exists?",
    (w1.getName !== undefined && w1.getLastname !== undefined && 
     w1.setName !== undefined && w1.setLastname !== undefined) ? "Yes" : "No"
].join(" "));

console.log([
    "Generated getters/setters exists?",
    (w1.getJobTitle !== undefined && w1.setJobTitle !== undefined) ? "Yes" : "No"
].join(" "));
}(DCS, window, console));
