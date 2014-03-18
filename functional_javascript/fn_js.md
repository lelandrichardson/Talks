


#Functional Concepts for the Practical JavaScript Developer

by Leland Richardson

@intelligibabble

tech.pro/leland

Follow along at bit.ly/functionaljs




###Is JavaScript Functional?

(no...)
remove assignment, loops, freeze array/object literals, and remove things like Date and Math.random

###What makes a language 'functional'?

- no state
- functions are first class objects
- Higher order functions (functions as arguments, return values)
- lambda support
- closures

###JavaScript: Origins

- designed to "look like" java
- scheme


###is this functional programming?
    
    $(".signup").click(function(event){
        $("#signup-modal").show();
        event.preventDefault();
    });

or what about....

    var friends = ["Jack","Jill","Jacob"];
    friends.forEach(function(friend){
        show("Hello " + friend + "!");
    });



###Scope in JavaScript (Closure)

- The context of an inner function includes the scope of the outer function
- An inner function enjoys that context even after the parent functions have returned.
- Function scope works like block scope


###The value of `this`

###`.apply()`, `.call()`, and `.bind()`


###Why Higher Order Functions


###Recursion

when a function calls itself







// talk about asking questions


###What about performance?

The question you should be asking is...

###What about *developer* performance?

    function add(a, b) {
        return a + b;
    }
    
    var result = add(1,2);
    
    function makeAdder(base) {
        return function (num) {
            return base + num;
        };
    }
    
    var result = add(1)(2);
    
    var add1 = makeAdder(1);
    add1(2); // 3
    add1(7); // 8






###examples

    //... the old way
    var names = [];
    
    for (var i = 0, l = tweeps.length; i < l; ++i) {
        names.push(tweeps[i].name);
    }
    
    
    //... the now typical way
    
    var names = map(tweeps, function (t) { return t.name; });
    
    //... the better way
    
    var getName = pluck('name');
    var names = map(getName, tweeps);


var sum = reduce(



// examples

 - debounce
 - call once
 - throttle


    function once(func){
        return function() {
            var f = func;
            func = null;
            return f.apply(this, arguments);
        };
    }

"functions as building blocks"

