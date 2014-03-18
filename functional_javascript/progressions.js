// setup
// ---------------------------------------------------------------

var slice = Array.prototype.slice,
    isFunction = function(o){
        return typeof o == 'function';
    };

Function.toFunction = function(value) {return value.toFunction();};
Function.prototype.toFunction = function() { return this; };


function toArray(x) {
    return slice.call(x);
}


// show & UI helpers
// ---------------------------------------------------------------
var $alert = $("#alert");
function show(obj){
    $alert.text($alert.text() + JSON.stringify(obj) + '\n');
}
var breaker = {};



// value function
// ---------------------------------------------------------------
function value(val){
    return function(){return val;}
}



// currying
// ---------------------------------------------------------------
function curry(fn /* , ... */) {
    var args = slice.call(arguments, 1);
    return function (/* ... */) {
        return fn.apply(this, args.concat(toArray(arguments)));
    };
}

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
Function.prototype.autoCurry = function (n) {
    return autoCurry(this, n);
};


var compose = function () {
    var fns = map(Function.toFunction, arguments),
        arglen = fns.length;
    return function () {
        var i;
        for (i = arglen; --i>=0;) {
            arguments = [fns[i].apply(this, arguments)];
        }
        return arguments[0];
    };
};


// iterators
// ---------------------------------------------------------------

var forEach = function(fn, array) {
    var i,length;
    for (i = 0,length = array.length; i < length; i++){
        if(fn(array[i],i) === breaker){return;}
    }
}.autoCurry();




function extend(target){
    forEach(function(source) {
        if (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        }
    },slice.call(arguments, 1));
    return target;
}


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

extend(window,{
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


var filter = function(predicate, sequence) {
    var results = [];
    forEach(function(value, index) {
        if(predicate.call(null,value,index)){
            results.push(value);
        }
    }, sequence);
    return results;
}.autoCurry();


var any = function(predicate, sequence) {
    var isTrue = false;
    forEach(function(value, index) {
        if((isTrue = predicate.call(null,value,index))){
            return breaker;
        }
    }, sequence);
    return isTrue;
}.autoCurry();



var limitTo = take = function(n, array) {
    return slice.call(array, 0, n);
}.autoCurry();


//var sortBy = function(obj, value) {
//    var iterator = lookupIterator(value);
//    return _.pluck(_.map(obj, function(value, index, list) {
//        return {
//            value : value,
//            index : index,
//            criteria : iterator.call(context, value, index, list)
//        };
//    }).sort(function(left, right) {
//            var a = left.criteria;
//            var b = right.criteria;
//            if (a !== b) {
//                if (a > b || a === void 0) return 1;
//                if (a < b || b === void 0) return -1;
//            }
//            return left.index < right.index ? -1 : 1;
//        }), 'value');
//};



var sum = reduce(add,0);

var min = reduce(function(prev,curr){return curr < prev ? curr : prev;},Infinity);

var max = reduce(function(prev,curr){return curr > prev ? curr : prev;},-Infinity);

var avg = reduce(function(prev,curr){return})




//
//
//var totalChunkedLength = buffers.
//    map(function (chunk) { return chunk.length; }).
//    reduce(function (prev, curr) { return prev + curr; });
//
//
////... should become
//
//var totalChunkedLength = buffers.
//    map(prop('length'))
//    reduce(add);
//
//// and then even...
//
//var totalChunkedLength = compose(reduce(add),map(prop('length')))(buffers);
//
//// and then let's just store it in case we need it later...
//
//var getChunkedLength = compose(reduce(add),map(prop('length')));
//
//var thisChunkedLength = getChunkedLength(buffers);
//


//buildSummary: function () {
//    return div(this.components.
//        map(result("getSummary")).
//        map(prop("text")).
//        map(p));
//}
















// operators
// ---------------------------------------------------------------

var prop = function (name, obj) {
    return obj[name];
}.autoCurry();

var pluck = function(name,list){
    return map(prop(name),list);
}.autoCurry();

//similar to prop. but for methods (and calls them)
var result = function (name, obj) {
    return obj[name]();
}.autoCurry();

var mapresult = function (name, list) {
    return map(result(name),list);
}.autoCurry();

var negate = falsy = function (fn) {
    return function(){
        return !fn.apply(this,arguments);
    };
}.autoCurry();


var modulo = function(divisor,dividend){
    return dividend % divisor;
}.autoCurry();



var isOdd = negate(modulo(2));
var isEven = negate(isOdd);


var split = function(separator,string){
    return string.split(separator);
}.autoCurry();





//
//// from underscore doing it wrong talk
//
//var firstTwoLetters = function(words){
//    return _.map(words,function(word){
//        return _.first(word,2);
//    });
//};
//
////... instead
//
//var firstTwoLetters = map(take(2));
//
//
//
////
//
//var sortedPhones = function(users){
//    return _.chain(users)
//        .sortBy(function(user){return user.signup_date; })
//        .map(function(user){return user.phone;})
//        .value();
//};
//
//// ====
//
//var sortedPhones = compose(map(prop('phone')),sort(prop('signup_date')));



function User(email,pw){
    this.email = email;
    this.pw = pw;
}
User.prototype.authenticate = function(testPw){
    return testPw == this.pw;
};

var person1 = new User('name','password');
//show(person1.authenticate('password'));
//show(person1.authenticate('bad'));


var userCtor = function(email,pw){
    return {
        email: value(email),
        pw: value(pw),
        authenticate: eq(pw)
    };
};

var person = userCtor('john@smith.com','p@$$w0rd');

//show(person.authenticate(''));





























var MyObject = function(val){
    this.val = val;
};
MyObject.prototype.map = function(f){
    return new MyObject(f(this.val));
};


var Maybe = function(val){
    this.val = val;
};
Maybe.prototype.map = function(f){
    return this.val !== null ? new Maybe(f(this.val)) : this;
};


var Either = function(defaultValue,actual){
    this.defaultValue = defaultValue;
    this.actual = actual;
};
Either.prototype.map = function(f){
    return this.actual !== null ? new Either(this.defaultValue,f(this.actual)) : this;
};








var data = ["a","b","c"];

var showAll = forEach(show);

showAll(data);











var car = function(list){
    return list[0];
};

var cdr = function(list){
    return list.slice(1);
};
var cons = function(atom, list){
    var tmp = [].push.apply([],list);
    tmp.unshift(atom);
    return tmp;
};
function isZero(number){ return number === 0;}
function isNull(list){return list.length === 0;}
function isEq(a,b){return a === b;}








// sort....


var sort = function(comparator,list){
    return list.sort(comparator);
}.autoCurry();
var numericalSort = sort(subtract); //  is like a<b;
var shuffle = sort(function() {return 0.5 - Math.random();});


// class methods


//var
//    alertAndClose = compose(closeWin,alertInvited),
//    callApi = compose(fmap(alertAndClose),Repo.Student.inviteParents),
//    inviteParents = compose(callApi,merge(user_id_param)),
//    extractParams = compose(mconcat, map(Field)),
//    sendInvite = compose(fmap(inviteParents),extractParams,getTextFields)
//;


//var $div = $("#myDiv");
//
//var getGreeting = compose(concat('Welcome '), prop('name'));
//var updateGreetingHtml = compose($div.html,getGreeting);
//
//updateGreetingHtml(App.current_user);





// "unsplat" -> have a function that has variadic args and puts them into an array passed into the last parameter of the function...
function variadic(fn){
    var argLength = fn.length;

    return function(){
        var args = toArray(arguments),
            newArgs = slice.call(args,0,argLength - 1);
        newArgs.push(slice.call(args,argLength-1));

        return fn.apply(this,newArgs);
    }
}

//...

var mylog = variadic(function(params){
    return console.log(params.join(' '));
});

var local1 = "abc";
var local2 = "def";

mylog(local1,local2);

var funstuff = variadic(function(a,b,c, /* ... */ theRest){
    show(["In funstuff",a,b,c,theRest]);
});

//TODO: show string.format method...






var following = [
    {id: 123, username: "@Oprah",name: "Oprah Winfrey"},
    {id: 456, username: "@justinbieber",name: "Justin Bieber"},
    {id: 789, username: "@rihanna",name: "Rihanna"},
    {id: 241, username: "@ladygaga",name: "Lady Gaga"},
    {id: 832, username: "@jimbob23",name: "Jim Bob"},
    // ...
];

var followers = [
    {id: 924, username: "@superfan_27",name: "Oprah Winfrey"},
    {id: 326, username: "@justinbieber",name: "Justin Bieber"},
    {id: 993, username: "@neverfollowjp",name: "フォロー決して"},
    {id: 832, username: "@jimbob23",name: "Jim Bob"},
    // ...
];


// find ids of "friends"



var friends = _.intersection(
    _.pluck(following,'id'),
    _.pluck(followers,'id'));




var getId = pluck('id');
var friends = intersect(getId(following),getId(followers));

// get all usernames




// get combined/unique array

// send tweet

// sort by ID method

var comparator = function(pred){
    return function(x,y){
        if(truthy(pred(x,y))){
            return -1;
        } else if(truthy(pred(y,x))){
            return 1;
        }
        return 0;
    };
};

var sortByIds = compose(sort,comparator,op[">="],pluck('id'));


show(sortByIds([{id:1},{id:-2},{id:6},{id:2}]));




// the argument for flipping args....


var firstTwoLetters = function(words){
    return _.map(words, function(word){
        return _.first(word,2);
    });
};

var firstTwoLetters = _.map(_.first(2));

firstTwoLetters(['jim','kate']);








function counterf(value){
    return {
        inc: function(){
            value += 1;
            return value;
        },
        dec: function(){
            value -= 1;
            return value;
        }
    }
}

function revocable(nice){
    return {
        invoke: function(){
            return nice.apply(this,arguments);
        },
        revoke: function() {nice = null;}
    };
}