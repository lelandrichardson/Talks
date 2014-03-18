//"use strict";
/**
 * HELPERS
 * ====================================
 */

//#region Helper Functions

var slice = Array.prototype.slice,
    isFunction = function(o){
        return typeof o == 'function';
    };




var $alert = $("#alert");
window.show = function(obj, clear){
    var toAppend;
    if(isFunction(obj)){
        //toAppend = obj.toString();
        toAppend = "(function)";
    } else {
        toAppend = JSON.stringify(obj);
    }
    $alert.text( (clear === true ? "" : $alert.text()) + toAppend + '\n');
};

//utilities
function toArray(x) {return slice.call(x);}
function value(val){return function(){return val;}}

//defining this later...
function autoCurry(fn, numArgs) {
    numArgs = numArgs || fn.length;
    var f = function () {
        if (arguments.length < numArgs) {
            return numArgs - arguments.length > 0 ?
                autoCurry(curry.apply(this, [fn].concat(toArray(arguments))),
                    numArgs - arguments.length) :
                curry.apply(this, [fn].concat(toArray(arguments)));
        }
        else {
            return fn.apply(this, arguments);
        }
    };
    f.toString = function(){ return fn.toString(); };
    f.curried = true;
    return f;
}

// no coming back now...
Function.prototype.autoCurry = function (n) {
    return autoCurry(this, n);
};

var op = {
    // arithmetic
    "+": function(a, b){return a + b;}.autoCurry(),
    "-": function(a, b){return a - b;}.autoCurry(),
    "*": function(a, b){return a * b;}.autoCurry(),
    "/": function(a, b){return a / b;}.autoCurry(),

    // equality
    "==": function(a, b){return a == b;}.autoCurry(),
    "===": function(a, b){return a === b;}.autoCurry(),
    "!=": function(a, b){return a != b;}.autoCurry(),
    "!==": function(a, b){return a !== b;}.autoCurry(),

    // comparison
    "<": function(a, b){return a < b;}.autoCurry(),
    ">": function(a, b){return a > b;}.autoCurry(),
    "<=": function(a, b){return a <= b;}.autoCurry(),
    ">=": function(a, b){return a >= b;}.autoCurry(),

    // negation
    "!": function(a){return !a;}
};
$.extend(window,{
    add: op["+"],
    subtract: op["-"],
    mult: op["*"],
    eq: op["=="],
    eqeq: op["==="],
    neq: op["!="],
    neqeq: op["!=="],
    lt: op["<"],
    gt: op[">"],
    lteq: op["<="],
    gteq: op[">="],
    not: op["!"]
});


// utility for comparison functions (useful for sort)
var comparator = function(pred){
    return function(x,y){
        if(!!pred(x,y)){
            return -1;
        } else if(!!pred(y,x)){
            return 1;
        }
        return 0;
    };
};

// functional "sort" implementation
var sort = function(pred,array){
    return Array.prototype.sort.call(array,comparator(pred));
}.autoCurry();


// useful for
var demethodize = function(fn){
    return function(a,b){
        return fn.call(a,b);
    }.autoCurry();
};


var flip = function(fn){
    return function(a,b){
        return fn.call(null,b,a);
    }.autoCurry();
};
var prop = function (name, obj) {
    return obj[name];
}.autoCurry();

var pluck = function(name,list){
    return map(prop(name),list);
}.autoCurry();




//#endregion






























/**
 * INVOKING FUNCTIONS
 * ====================================
 */


var tester = function(a,b,c){
    show({
        this: this,
        a: a,
        b: b,
        c: c
    });
};
//(function() {
//    tester("this","is","cool");
//})();

//
//tester.apply(null,["is","even","cooler"]);
//tester.call("this?",["is","even","cooler"]);
//tester.call("this?","is","even","cooler");

// what about arguments?

// this does nothing...

function doStuff(a,b,c){
    return c + b + a;
}
function doSameStuff(){
    return doStuff.apply(this,arguments);
}
// call...


function ignoreFirstArg(){
    var args = slice.call(arguments);
    args.shift();
    args.unshift(120);
    return doStuff.apply(this,args);
}

//show(doStuff(1, 2, 3));
//show(ignoreFirstArg(1, 2, 3));




































/**
 * FUNCTION CLOSURE
 * ====================================
 */

// lexical scoping



// global scope...
var names = ['zero','one','two','three','four','five','six','seven','eight','nine'];

var digit_name1 = function(n){
    return names[n];
};


// "The context of an inner function includes the scope of the outer function"
var digit_name2 = function(n){
    var names = ['zero','one','two','three','four','five','six','seven','eight','nine'];
    return names[n];
};


// "An inner function enjoys that context even after the parent functions have returned."
var digit_name3 = (function(){
    var names = ['zero','one','two','three','four','five','six','seven','eight','nine'];
    return function(n){
        return names[n];
    };
})();



//show(_.map([1,2,3],digit_name1));
////
//show(_.map([1,2,3],digit_name2));
////
//show(_.map([1,2,3],digit_name3));



(function outer(){
    var x = 0;
    return function inner(n){
        var y = x;
    };
})();


// `sum` and `count` are kept as private variables, enjoyed by the scope of step()

// walk averages of Math.random()
function walkAverage(trials, element) {
    var sum = 0,
        count = 0,
        div = $(element)
    function step() {
        sum += Math.random(),
        count += 1;

        div.text((sum / count));
        
        if (count < trials) {
            setTimeout(step, 0);
        }
    }

    setTimeout(step, 0);
}


//walkAverage(5000,"#div1");

//walkAverage(5000, "#div2");

//note: show that sum and count are created each time walkAverage is called, and don't conflict...


































/**
 * FUNCTION CURRYING - MANUAL
 * ====================================
*/

var foo = function(a){
    return function(b){
        return a + b;
    };
};




foo(2)(4); // 6

// x -> 4 + x
var add4 = foo(1);

add4(3); // 7




var binaryf = function (fn){
    return function(x) {
        return function(y) {
            return fn(x, y);
        };
    };
};
var addf = binaryf(add); // x -> y -> x + y
addf(3)(4); // 7
binaryf(mult)(5)(6); // 30

































/**
 * FUNCTION CURRYING - APPLICATIVE
 * ====================================
 */
//simple (binary, x) -> y -> binary(x,y)
//function curry(fn, first) {
//    return function (second) {
//        return fn(first,second);
//    };
//}
function curry(fn, ...args) {
    return function (...args2) {
        return fn.call(this, ...args, ...args2)
    };
}

// what will this look like in ES6????


var test = function(a,b,c){
    return a + b + c;
};

var sayHi = curry(test,"Hello", " ");

//show(sayHi("Joe!")); // "abc";)



var test1 = curry(test,"a");

//show(test1("b")); // "abundefined"
//show(test1("b","c")); // "abc"


var test2 = curry(test1,"b");

//show(test2("c"));

var test3 = curry(test2,"c");

//show(test3);
//show(test3("x"));
//show(test3());



//note: only works "once"... (ie, 2 levels deep)





























/**
 * FUNCTION CURRYING - CRAZY WEIRDNESS
 * ====================================
 */

function autoCurry(fn, numArgs) {
    numArgs = numArgs || fn.length;
    var f = function () {
        if (arguments.length < numArgs) {
            return numArgs - arguments.length > 0 ?
                autoCurry(curry.apply(this, [fn].concat(toArray(arguments))),
                    numArgs - arguments.length) :
                curry.apply(this, [fn].concat(toArray(arguments)));
        }
        else {
            return fn.apply(this, arguments);
        }
    };
    f.toString = function(){ return fn.toString(); };
    f.curried = true;
    return f;
}

// no coming back now...
Function.prototype.autoCurry = function (n) {
    return autoCurry(this, n);
};


var boring = function(a,b,c,d,e,f){
    return a + b;
}.autoCurry();

//show(boring("a"," not b ")("b")("c")()("blag", "h"));
//TODO: more examples...





















/**
 * VARIADIC FUNCTION ARGUMENTS
 * ====================================
 */

function variadic(fn) {
    var fnArgs = fn.length;
    return function() {
        var params = slice.call(arguments, fnArgs -2),
            realArgs = slice.call(arguments, 0, fnArgs - 1);
        realArgs.push(params);
        return fn.apply(this, realArgs);
    };
}


var stringFormat = variadic(function(template,test, /* ... */ params){
    return template.replace(/{(\d+)}/g, function (m, n) {
        return '' + params[n];
    });
});

//show(
//    // "Hello Amy, Have you met Jack?";
//    stringFormat("Hello {0}, Have you met {1}?", "Amy", "Jack")
//);



































/**
 * FUNCTION COMPOSING
 * ====================================
 */

// compose(f1, f2, f3..., fn)(args) == f1(f2(f3(...(fn(args...)))))
var compose = function (/*f1,f2, ..., fn*/) {
    var fns = arguments,
        arglen = fns.length;
    return function () {
        var i;
        for (i = arglen; --i>=0;) {
            arguments = [fns[i].apply(this, arguments)];
        }
        return arguments[0];
    };
};


// sequence(f1, f2, f3..., fn)(args...) == fn(...(f3(f2(f1(args...)))))
var sequence = function (/*f1,f2, ..., fn*/) {
    var fns = arguments,
        arglen = fns.length;
    return function() {
        for (var i = 0; i < arglen; i++)
            arguments = [fns[i].apply(this, arguments)];
        return arguments[0];
    };
};




// f(g(x)) = (2 * x) + 3
var action = compose(add(3), mult(2));

//show(action(24)); // 51




















/**
 * LOOPING FUNCTIONS
 * ====================================
 */

var forEach = function(fn, array) {
    var i,length;
    for (i = 0,length = array.length; i < length; i++) {
        fn(array[i], i);
    }
}.autoCurry();


var map = function(fn, sequence) {
    var result = [];
    if (isFunction(sequence.map)) {return sequence.map(fn);}
    forEach(function(element,i){
        result.push(fn(element,i));
    },sequence);
    return result;
}.autoCurry();



var reduce = foldl = function(combine, base, array) {
    forEach(function (element) {
        base = combine(base, element);
    }, array);
    return base;
}.autoCurry();



var reduceRight = foldr = function(combine, base, array) {
    //just because i'm lazy
    return array.reduceRight(combine, base);
}.autoCurry();


var pluck = function(name, list) {
    return map(function(obj) {
        return obj[name];
    }, list);
}.autoCurry();

var sortAsc = sort(op["<"]); 


var getSortedIds = compose(sortAsc, pluck('id'));


//show(getSortedIds([{id:1},{id:-2},{id:6},{id:2}]));






















/**
 * FACTORIES
 * ====================================
 */

function User(email,pw){
    this.email = email;
    this.pw = pw;
}
User.prototype.authenticate = function(testPw){
    return testPw == this.pw;
};

var userCtor = function(email,pw){
    return {
        email: value(email),
        pw: value(pw),
        authenticate: eq(pw)
    };
};

var person1 = new User('john@smith.com','p@$$w0rd');

var person2 = userCtor('john@smith.com','p@$$w0rd');

//show(person1.authenticate(''));































/**
 * FUNCTION COMPOSITION (DOING USEFUL THINGS)
 * ==========================================
 */


var csvString = "name,age,hair\nJohn,26,brown\nGabe,32,blonde";

function parseCSV(str){
    return _.reduce(
        str.split("\n"),
        function(table,row){
            table.push(_.map(row.split(","),function(c){
                return c.trim();
            }));
            return table;
        },[]);
}

//show(parseCSV(csvString));



// useful global functions... needed here.
var split = flip(demethodize(String.prototype.split)); //splitBy argument should come first
var trim = demethodize(String.prototype.trim);


// a couple of utility functions
var splitByNewLine = split("\n");
var splitByComma = split(",");

var processRow = compose(map(trim), splitByComma);

var parsecsv = compose(map(processRow),splitByNewLine);






show(parsecsv(csvString));
