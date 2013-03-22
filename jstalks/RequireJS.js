//Explicitly defines the "foo/module" module:
define("foo/module", ["jquery", "foo/other"],
    function($, other) {
        //Define foo/module object in here.
        // jQuery '$' and 'other' modules are set as dependencies
    }
);


require(["jquery","foo/other","foo/module"],
    function($,other,module){
        //write page-level logic here
        module.start();
        other.bind("#someElementId");
        $("#someElementId").animate(/* ... */);
        // ...
    }
);