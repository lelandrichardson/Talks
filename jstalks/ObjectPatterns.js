var MyAppNameSpace = MyAppNameSpace || {};
(function(app,window,$ /* ,lib2, lib3, ... */){
    /*
    app => My Application Namespace
    window => Global scope you would like to operate on
    $ => instance of jQuery I would like to operate on
    ...
    other libraries I would like to import or depend on.
     */

    app.doStuff = function(){
        // do stuff here
    };

}(MyAppNameSpace,window,jQuery /* ... */));





// CREATING OBJECTS
// -----------------------------------------------


var Person = function(name){
    this.name = name;
    this.isSleeping = false;
    this.sayHello = function(){
        if(!this.isSleeping){
            alert("Hello! My name is " + this.name);
        }
    };
    this.sleep = function() {
         this.isSleeping = true;
    }
};

var Person = function(name){
    var self = this;
    self.name = name;
    self.isSleeping = false;
    self.sayHello = function(){
        if(!this.isSleeping){
            alert("Hello! My name is " + this.name);
        }
    };
    self.sleep = function() {
        this.isSleeping = true;
    }
};

// note: these two things are the same!
var Foo = function(){
    this.bar = "bar";
};

var Foo = function(){
    this.bar = "bar";
    return this;
};

// Foo MUST be called with `new` operator
//NOTE:  "use strict"; directive will prevent this.


var foo = new Foo();
foo.bar; // "bar"
bar; // "undefined"

var foo2 = Foo();
foo2.bar; // "bar";
bar; // "bar";

// design pattern to prevent this...

var Foo = function(){
    if(!(this instanceof Foo)){
        return new Foo();
    }
    this.bar = "bar";

    return this;
}

//alternative: don't use `new` operator
// however, here Foo.prototype will not be used

var foo = function(){
    var self = {};

    self.bar = "bar";

    return self;
};

var Foo = function(){
    var self = this instanceof Foo
                ? this
                : Object.create(Foo.prototype);

    self.bar = "bar";

    return self;
};


//poly-fill for Object.create
if(typeof Object.create === "undefined"){
    Object.create = function(prototype){
        function C(){}
        C.prototype = prototype;
        return new C();
    }
}


Object.defineProperty(Object.prototype, "allKeys", {
    value: function(){
        var result = [];
        for (var key in this){
            result.push(key);
        }
        return result;
    },
    writeable: true,
    enumerable: false,
    configurable: true
});
















// EMBRACING PROTOTYPE
// ---------------------------------
var Person = function(name){
    var self = this;
    self.name = name;
    self.isSleeping = false;
};
Person.prototype.sayHello = function(){
    if(!this.isSleeping){
        alert("Hello! My name is " + this.name);
    }
};
Person.prototype.sleep = function(){
    this.isSleeping = true;
};





















// MAINTAINING LOCAL STATE -> PUBLIC AND PRIVATE
// ==================================================

var Person = function(options){
    //read only property
    var _name = options.name;
    var getName = function(){
        return _name;
    };

    // gettable/settable property
    var _sleeping = options.sleeping || false;
    var setSleeping = function(val){
        _sleeping = val;
    };
    var getSleeping = function(){
        return _sleeping;
    };

    // internal state
    var _helloCount = 0;

    // public methods
    var sayHello = function(){
        if(!_sleeping && _helloCount < 10){
            _helloCount += 1;
            alert("Hello! My name is " + _name);
        }
    };

    // expose the public API
    return {
        getName: getName,
        setSleeping: setSleeping,
        getSleeping: getSleeping,
        sayHello: sayHello
    };
};








// CLOSE OVER PRIVATE DATA
// ===================================================

//INSTEAD OF
var dayOfWeek = function(day, startOnMonday) {
    //instantiated into memory with every call
    var _days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    startOnMonday = startOnMonday || false;
    return _days[(day - (startOnMonday ? 1 : 0)) % _days.length];
};

// INSTANTIATE DATA ONCE
var dayOfWeek = (function() {
    // instantiated once
    var _days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return function(day, startOnMonday) {
        startOnMonday = startOnMonday || false;
        return _days[(day - (startOnMonday ? 1 : 0)) % _days.length];
    }
}());









// WORKING WITH INHERITANCE
// =========================================================


//prototypal inheritence

var Foo = function(){};
Foo.prototype.bar = function(){
    alert("bar from Foo!");
};
var FooBar = function(){};
FooBar.prototype = new Foo();
FooBar.prototype.bizz = function(){
    alert("buzz from FooBar!");
};




function Gizmo(id){
    this.id = id;
};
Gizmo.prototype.toString = function(){
    return "gizmo " + this.id;
};


function Hoozit(id){
    this.id = id;
};
Hoozit.prototype = new Gizmo();
Hoozit.prototype.test = function(id){
    return this.id === id;
};



