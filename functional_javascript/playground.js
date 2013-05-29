function derivative(f){
    return function(x){
        return (f(x + 0.000001) - f(x))/ 0.000001;
    };
}

function forEach(array, action) {
    for (var i = 0; i < array.length; i++)
        action(array[i]);
}

function reduce(combine, base, array) {
    forEach(array, function (element) {
        base = combine(base, element);
    });
    return base;
}

function map(func, array) {
    var result = [];
    forEach(array, function (element) {
        result.push(func(element));
    });
    return result;
}

var op = {
    "+": function(a, b){return a + b;},
    "==": function(a, b){return a == b;},
    "===": function(a, b){return a === b;},
    "!": function(a){return !a;}
    /* and so on */
};

function asArray(quasiArray, start) {
    var result = [];
    for (var i = (start || 0); i < quasiArray.length; i++)
        result.push(quasiArray[i]);
    return result;
}

function partial(func) {
    var fixedArgs = asArray(arguments, 1);
    return function(){
        return func.apply(null, fixedArgs.concat(asArray(arguments)));
    };
}

function compose(func1, func2) {
    return function() {
        return func1(func2.apply(null, arguments));
    };
}

function composeAll() {
    var funcs = arguments;
    return function() {
        var args = arguments;
        for (var i = funcs.length - 1; i >= 0; i--) {
            args = [funcs[i].apply(this, args)];
        }
        return args[0];
    };
}


function identity(x) { return x;}

function memoize(func, hasher) {
    var memo = {};
    hasher || (hasher = identity);
    return function() {
        var key = hasher.apply(this, arguments);
        return memo.hasOwnProperty(key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
}


// Returns a function, that, when invoked, will only be triggered
// at most once during a given window of time.
function throttle(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
        previous = new Date;
        timeout = null;
        result = func.apply(context, args);
    };
    return function() {
        var now = new Date;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

// Returns a function, that, as long as it continues to be invoked,
// will not be triggered. The function will be called after it
// stops being called for N milliseconds. If immediate is passed,
// trigger the function on the leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout, result;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
}

// Returns a function that will be executed at most one time,
// no matter how often you call it. Useful for lazy initialization.
function once(func) {
    var ran = false, memo;
    return function() {
        if (ran) return memo;
        ran = true;
        memo = func.apply(this, arguments);
        func = null;
        return memo;
    };
}

// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after,
// and conditionally execute the original function.
function wrap(func, wrapper) {
    return function() {
        var args = [func];
        push.apply(args, arguments);
        return wrapper.apply(this, args);
    };
}

