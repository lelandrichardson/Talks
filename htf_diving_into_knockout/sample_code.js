//Application Structure
//Constructor/Object Pattern


var Recipe = function(spec){

    this.id = ko.observable();
    this.name = ko.observable();
    this.type = ko.observable();

    this.ingredients = ko.observableArray();
};

var Ingredient = function(spec){
    this.id = ko.observable();
    this.name = ko.observable();
    this.amount = ko.observable();
};


var spec = {
    id: 123,
    name: "Breaded Parmesan Ranch Chicken",
    type: "Salad",
    ingredients: [
        { id: 243, name: "Crushed Corn Flakes", amount: "3/4 cup" },
        { id: 512, name: "Grated Parmesan Cheese", amount: "3/4 cup" },
        { id: 928, name: "Chicken Breasts", amount: "8 x 4oz pcs" },
        { id: 148, name: "Butter (melted)", amount: "1/2 cup" }
    ]
};


//ViewModel Inheritence





//Managing `this`

var Cocktail = function(){
    this.name = ko.observable("Pimm's Cup");
    this.type = ko.observable("Gin");
    this.title  = ko.computed(function(){
        // uh oh, do we know that `this` is the right one?
        return this.name() + " (" + this.type() + ")";
    });
};

var Cocktail = function(){
    this.name = ko.observable("Pimm's Cup");
    this.type = ko.observable("Gin");
    this.title  = ko.computed(function(){
        // now we do!
        return this.name() + " (" + this.type() + ")";
    },this);
};

var Cocktail = function(){
    var self = this; // alias `this`;
    self.name = ko.observable("Pimm's Cup");
    self.type = ko.observable("Gin");
    self.title  = ko.computed(function(){
        // reference properties by jumping up scope instead
        return self.name() + " (" + self.type() + ")";
    });
};


//Compound ViewModels

var Cocktail = function(){
    this.ingredients = ko.observableArray(); // Array<Ingredient>
};

var Ingredient = function() {

};

//Working with the server




//Widgets & `allowBindings: false`
//Load data asynchronously
//Mapping & ko.toJSON & ko.toJS
//Custom Binding Handlers
//Binding handlers are your friend
//Should be part of every ko user’s toolbelt.  They really are easy to understand…
//What a binding handler is looking for
//    Utilize existing bindings (simple example…  hidden?)
//Encapsulate logic to write cleaner code (click to edit)
//If you need the DOM in your VM, you are doing it wrong
//BindingHandlers control *binding*. Observables care not.

ko.bindingHandlers.currency = {
    update: function(element,valueAccessor){
        // unwrap the amount, default to 0
        var amount = parseFloat(ko.utils.unwrapObservable(valueAccessor())) || 0;

        // could set text directly, but we will just use the text bindingHandler instead
        var newValueAccessor = function() {
            return "$" + amount.toFixed(2);
        };
        // call real text binding
        ko.bindingHandlers.text.update(element,newValueAccessor);
    }
};


//    Working with other libraries/plugins (jQuery)
//Markdown Editor
//jQuery Sortable, AutoComplete, ProgressBar
//Advanced Usage
//Writeable Computed Observables

var firstName = ko.observable("Leland"),
    lastName = ko.observable("Richardson"),
    fullName = ko.computed({
        read: function(){
            return firstName() + ' ' + lastName();
        },
        write: function(newValue){
            var words = newValue.split(' ');
            if(words.length === 0){
                firstName(''); lastName('');
            } else if(words.length === 1){
                firstName(newValue);
                lastName('');
            } else {
                firstName(words.shift());
                lastName(words.join(' '));
            }
        }
    });

var safeValue = /$[a-zA-Z0-9]*^/;
var value = ko.observable(),
    valueToEdit = ko.computed({
        read: value,
        write: function(newValue){
            //see if value is proper value, else don't change
            if(safeValue.test(newValue)) {
                value(newValue);
            }
        }
    });

var disallowed = /[^a-zA-Z0-9]/;
var value = ko.observable(),
    valueToEdit = ko.computed({
        read: value,
        write: function(newValue){
            //do some sort of cleaning / preprocessing here
            newValue = newValue.replace(disallowed,'');
            value(newValue);
        }
    });


//Staying DRY with Extensions



ko.observable.fn.asNumber = function (precision) {
    //create a writeable computed observable to intercept writes to our observable
    var original = this,
        interceptor = ko.computed({
        read: original,  //always return the original observables value
        write: function (newValue) {
            var current = original(),
                roundingMultiplier = Math.pow(10, precision),
                newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
                valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

            //only write if it changed
            if (valueToWrite !== current) {
                original(valueToWrite);
            } else {
                //if the rounded value is the same, but a different value was written, force a notification for the current field
                if (newValue !== current) {
                    original.notifySubscribers(valueToWrite);
                }
            }
        }
    });

    //initialize with current value to make sure it is rounded appropriately
    interceptor(original());

    //return the new computed observable
    return interceptor;
};

//extension to replace an observable with a writeable computed that forces write to be numeric
ko.observable.fn.asPositiveInteger = function(defaultForBadValue){
    var original = this,
        interceptor = ko.computed({
            read: original,
            write: function(newValue){
                var parsed = parseInt(newValue, 10);
                //if value is bad or negative, then use default
                if(isNaN(parsed) || parsed < 0){
                    parsed = defaultForBadValue;
                }
                original(parsed);
            }
        });
    //process the initial value
    interceptor(original());

    //return this new writeable computed to "stand in front of" our original observable
    return interceptor;
};

// using knockout's pub/sub to your advantage
// dirty flags


var isThisDirty = (function(state){
    var initial = ko.toJS(state);
    return ko.computed(function(){
        return ko.toJSON(initial) !== ko.toJSON(state);
    });
})(this);

var isDirty = function(state){
    var initial = ko.toJS(state);
    return ko.computed(function(){
        return ko.toJSON(initial) !== ko.toJSON(state);
    });
};


// http://jsfiddle.net/rniemeyer/dtpfv/
ko.dirtyFlag = function (root, isInitiallyDirty) {
    var result = function () { },
        _initialState = ko.observable(ko.toJS(root)),
        _isInitiallyDirty = ko.observable(isInitiallyDirty);

    result.isDirty = ko.dependentObservable(function () {
        return _isInitiallyDirty() || ko.toJSON(_initialState()) !== ko.toJSON(root);
    });

    result.dirtyItems = ko.dependentObservable(function() {
        var currentState = ko.toJS(root);
        var initialState = _initialState();
        var returnValue = { };
        for (var i in initialState) {
            if (currentState[i] !== initialState[i]) {
                returnValue[i] = currentState[i];
            }
        }
        return returnValue;
    });

    result.reset = function () {
        _initialState(ko.toJS(root));
        _isInitiallyDirty(false);
    };

    result.resetToInitial = function () {
        var currentState = ko.toJS(root);
        var initialState = _initialState();
        var returnValue = {};
        for (var i in initialState) {
            if (currentState[i] !== initialState[i]) {
                //note this is assuming root is an observable
                root[i](initialState[i]);
            }
        }
    };
    return result;
};

var Cocktail = function(){
    this.ingredients = ko.observableArray();
    this.name = ko.observable();
    this.rating = ko.observable();
    this.ingredientToAdd = ko.observable();

    this.dirtyTracker = ko.dirtyFlag([
        this.ingredients,
        this.name,
        this.rating
    ],false);

};


// faux dependencies to integrate with other frameworks

var trigger = ko.observable(true);
var windowSize = ko.computed(function(){
    trigger(); //create dependency
    return $(window).height();
});

$(window).resize(function(){
    // make sure all dependent observables update themselves
    trigger(!trigger());
});

// talk about the throttle extender here


// use ko.computed to respond to changes for one of several things....

var foo = ko.observable(), bar = ko.observable();

foo.subscribe(function(newValue){
    //respond to foo changing
});

bar.subscribe(function(newValue){
    //respond to bar changing
});

ko.computed(function(){
    foo();
    bar();

    // do something useful that depends on foo and bar

});

ko.computed(function(){
    //deep subscribe to any observable inside viewmodel
    ko.toJS(viewModel);

    // do something useful that depends on foo and bar

}).extend({throttle: 2});


//simple editor pattern?



//common functionality

// i commonly want a button click handler, and an "enable" observable
var button = function(spec){
    return ko.utils.extend(function(){},{
        click: spec.click || function(){},
        enable: spec.enable || ko.observable(true),
        text: spec.text
    });
};

var Cocktail = function(){

    this.ingredients = ko.observableArray();

    this.save = function() {
        //run save inside here
    };

    this.saveEnabled = ko.computed(function(){
        //at least one ingredient is required
        return this.ingredients.length>0;
    },this);
};

var Cocktail = function(){

    this.ingredients = ko.observableArray();
    this.save = button({
        click: function() {
            //run save inside here
        },
        enable: ko.computed(function(){
            //at least one ingredient is required
            return this.ingredients.length>0;
        },this)
    });
};

ko.bindingHandlers.button = {
    init: function(element, valueAccessor, allBindingsAccessor){
        var button = valueAccessor(),
            allBindings = allBindingsAccessor();

        var bindings = {
            click: button.click,
            enable: button.enable
        };
        if(button.text){
            bindings.text = button.text;
        }

        // ansures that other click: and enable: bindings will override the button: binding
        ko.utils.extend(bindings, allBindings);

        ko.applyBindingsToNode(element, bindings);
    }
};