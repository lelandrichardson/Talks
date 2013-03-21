
(function(){
    var add = function(a,b){
        return function(){
            return a() + b();
        };
    };
    var sub = function(a,b){
        return function(){
            return a()-b();
        }
    };

    var mult = function(a,b){
        return function(){
            return a()*b();
        };
    };

    var div = function(a,b){
        return function(){
            return a()/b();
        };
    };

    var i = function(x){
        return function(){
            return x;
        }
    };

    //(5 + 6) * 10 = 110
    alert(
        mult(add(i(5),i(6)),i(10))()
    );





})();

// CHAINING
// ---------------------------------------------
Function.prototype.chain = function(){
    var args = Array.prototype.slice.call(arguments, 0);
    args.splice(0,0,this);
    return function(){
        var innerArgs = arguments;
        args.forEach(function(fn){
            fn.apply(fn,innerArgs);
        });
    };
};
// chain with a global function instead of prototype method
var chain = function(){
    var args = Array.prototype.slice.call(arguments, 0);
    return function(){
        var innerArgs = arguments;
        args.forEach(function(fn){
            fn.apply(fn,innerArgs);
        });
    };
};

(function(){
    var a = function(hello){
        console.log(hello + " from a");
    };
    var b = function(hello, again){
        console.log(hello + again + " from b");
    };
    a.chain(b,a,b,b,a)("hello", " again");

    //OR

    chain(a,b,a,b,a,b)();
})



