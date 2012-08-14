/**
 * Runs all defined test.
 *
 * @author Jorge Ramírez <jorgeramirez1990@gmail.com>
 **/
(function(window, document) {
    var tests, i, script,
        NUM_TEST = 2; // Number of tests. Change this if a new test is added.
    

    function loadTest(num) {
        if(script){
            document.head.removeChild(script);
        }
        script = document.createElement("script");
        script.src = "test_" + num + ".js";
        script.type = "text/javascript";
        document.head.appendChild(script);
    }

    for(i = 1; i <= NUM_TEST; i++){
        loadTest(i);
    }
    document.head.removeChild(script);
}(window, document));
