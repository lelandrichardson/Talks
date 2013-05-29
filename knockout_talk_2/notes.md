#What is KnockoutJS?

###Library vs. Framework
- first thing I always tell people
- what does that mean? what's the difference?

- doesn't dictate the *structure* of your code.  Just generally makes it easier to do what you want.
- to do that it provides "bindings" and "plumbing" for your data and logic to flow through your application logically and seamlessly
- you can still mess up. and I mean *mess up bad*.  It doesn't safe-guard you from writing crap.
- In my opinion, it makes writing UI applications fun again.  It feels more like programming and less like DOM bullshit.
- abstracts away the DOM - except for when you *really* need it.
- as many libraries are, knockout is fairly light-weight.  14kb is not minuscule, but it has zero dependencies (not even jQuery!!!) and you can write fairly sophisticated applications right away.

###Model-View-ViewModel: What is that all about?

Generally most of these new frontend frameworks (or libraries, in this case) operate off of similar principles.  The big fundamental leap that they all took was to have the concept of a 
**Model** formed as pure JS (and thus, most commonly transferred to the client by means of JSON).

The important thing to note here is that the data *does NOT* reside in HTML.  HTML is what we call the **View**.

The real meat of all of these frameworks is really in the process of going from the model to the view.  In Knockout's case, a lot of this ends up happening in what is called the **ViewModel**, thus completing our MVVM acronym.

The ViewModel utilizes the power of javascript and is where you write a lot of your view logic.  Some amount of application logic can live here as well, but there is nothing that says that needs to be the case. Granted, both your application and your viewmodels will be *built* in javascript, so it's up to you the amount of separation you want there.

What many people forget, as it isn't part of our acronym, is the arrows.

The arrow between Model and ViewModel isn't really all that interesting.  We will talk about mapping a bit, which can get into this a little bit - but generally there are only so many ways people can take JSON and push it into a ViewModel.

The other arrows are more important.  This is where Knockout's magic really sets in.

###Declarative Bindings

Rendering the View (in HTML) with a ViewModel is a process called "binding".  

knockout has binding handlers which are "declarative" in the sense that you are writing in this data-bind directive exactly what is getting bound, and how.

They are "two-way" in the sense that something can happen to the view (ie, the user does something), which can cause information to flow from the view to the viewModel.  

Likewise, Something can change in your view model (or your application code for that matter) which can then cause the view to update.  It's symmetric.

This is more or less all done for you.  Knockout is built on top of a thin pub-sub observable patter which has automatic dependency detection built in.

This gives you the power to ensure that your view stays in a consistent state with *very little logic*.

###Knockout Class Hierarchy

Knockout exposes pub-sub framework exposes a couple of different classes that implement `ko.subscribable`

`ko.subscribable` exposes a `.subscribe(callback)` method to pass in a callback which will get called any time the wrapped object changes, as well as `notifySubscribers` and `getSubscriptionsCount` methods.

`ko.observable` is a wrapper for any object. It exposes some additional methods like `.peek()` to prevent automatic dependency detection, `.valueHasMutated()` to notify subscribers of a change, and `.valueWillMutate()`

`ko.observableArray` is an augmented version of `ko.observable` that simply makes the assumption that the underlying object is an array, and exposes several useful methods for handling arrays like:

- `.remove()`
- `.removeAll()`
- `.destroy()`
- `.removeAll()`
- `.indexOf()`
- `.replace()`
- `.pop()`
- `.push()`
- `.reverse()`
- `.shift()`
- `.sort()`
- `.splice()`
- `.unshift()`
- `.slice()`

Most of these are simply wrappers for the prototype methods on the underlying array, although they help ensure that the modifying operations trigger notifications of the changes to the array's subscribers.

#Hello World

I'm inherently suspicious of most "Hello World" type examples, as they normally intentionally try and remove any complexity to the point where it often times is not at all an accurate indicator as to whether or not that framework will be useful to me.  That being said, I will quickly go through the typical "Hello World" of knockout.js, but one should keep this in mind always.

###Hello World in Knockout.js: The Old Way

So you have loaded data from server or wherever, and you need to represent it in your UI and maybe let the user edit it and modify it.

	<input id="name" /><hr/>
	<div id="display"></div>
	
	var cocktail = {
	    name: "Gin and Tonic",
	    rating: 9.5
	};

So this all isn't very helpful and maybe to create an editor for this using jQuery we would write something like this:

	$("#display").text(cocktail.name);
	$("#name").val(cocktail.name).change(function(){
	    cocktail.name = this.value;
	    $("#display").text(this.value);
	});

This seems to do roughly what we want... but there are some code smells...  now details about the UI is dictating our business logic.  Separation of concerns, yada yada.

So let's get back to the root of it.


	<input /><hr/>
	<div></div>

	var cocktail = {
	    name: "Gin & Tonic",
	    rating: 9.5
	};

	// ** LIVE CODING **

	<input data-bind="value: name"/><hr/>
	<div data-bind="text: name"/>
	
	var cocktail = {
	    name: "Gin & Tonic",
	    rating: 9.5
	};
	
	ko.applyBindings(cocktail);

At this point our view is actually updating the underlying data, and nothing about the view is infecting our code.  in fact... we don't really have any code yet.  All we have is the model.

Even though the div isn't updating when we change the value of the input, our two-way `value` binding is actually doing some work here.

    <input type="text" data-bind="value: name"/><hr/>
    <div data-bind="text: name"></div>
    <button data-bind="click: alert">Click Me</button>

*Note: for the moment just ignore what click/alert is doing.  This is a contrived example*

Here we can see that the underlying model *is* actually updated, but our view is left in an inconsistent state.

We must use observables to prevent this...


	<input data-bind="value: name"/><hr/>
	<div data-bind="text: name"/>
	
	var cocktail = {
	    name: ko.observable("Gin & Tonic"),
	    rating: 9.5
	};
	
	ko.applyBindings(cocktail);

Now the view is automatically updated when the underlying data has changed.


###Binding Examples : Computed Observables


	<input data-bind="value: name"/><hr/>
	<div data-bind="text: name"/>
	
	var cocktail = {
	    name: ko.observable("Gin & Tonic"),
	    rating: 9.5
	};
	
	ko.applyBindings(cocktail);

	// ** LIVE CODING **

	<input data-bind="value: name"/><hr/>
	<div data-bind="text: displayName"/>
	
	var cocktail = {
	    name: ko.observable("Gin & Tonic"),
	    rating: 9.5
	};

	cocktail.displayName = ko.computed(function() {
		return cocktail.name() + ' (' + cocktail.rating + ')';
	}, cocktail);
	
	ko.applyBindings(cocktail);

Note: here it might be nice to show them that the values can update dynamically as you type...

	<input data-bind="value: name, valueUpdate: 'afterkeydown'"/><hr/>
	<div data-bind="text: displayName"/>

Note: important to emphasize that we need to use `cocktail.name()` rather than `cocktail.name`. Demonstrate the difference.

	<input data-bind="value: name, valueUpdate: 'afterkeydown'"/><hr/>
	<div data-bind="text: displayName"/>



###Binding Examples : Arrays

So often times we need to deal with lists of things.  Knockout has a lot to offer here too.

- observable arrays
- context variable ($data)
- templating

----
    <h3 data-bind="text: name"></h3>
    <form data-bind="submit: add">
        <input data-bind="value: next" placeholder="Add Ingredient"/>
        <button type="submit">Add</button>
        <hr/>
    </form>
    <ul data-bind="foreach: ingredients">
        <li data-bind="text: $data"></li>
    </ul>
    	
	var Cocktail = function(name) {
	    this.name = ko.observable(name);
	    this.ingredients = ko.observableArray([]);

	    this.next = ko.observable();
	    this.add = function(){
	        this.ingredients.push(this.next());
	        this.next("");
	    }
	};
	
	ko.applyBindings(new Cocktail("Ice Bomb"));
	


One of the things that is interesting about knockout, is that all observables are functions - and functions are just objects in javascript and can thus have any number of properties off of them.

You can see in the `toJSON` output of this view model that the value of `next` is included in the model's JSON output.

This is fine in many cases, but perhaps not desirable...  it is probably not data we want to send back up to the server (which we will talk about later).

I can quickly refactor this a little bit to prevent this from happening like so:


	// ** LIVE CODING **


    <h3 data-bind="text: name"></h3>
    <form data-bind="submit: add">
        <input data-bind="value: ingredients.next" placeholder="Add Ingredient"/>
        <button type="submit">Add</button>
        <hr/>
    </form>
    <ul data-bind="foreach: ingredients">
        <li data-bind="text: $data"></li>
    </ul>
	
	<pre data-bind="text: ko.toJSON($root,null,2)"></pre>


	// ** LIVE CODING **


	<h3 data-bind="text: name"></h3><hr/>
	<b>Ingredients:</b><br/>
	<input data-bind="value: ingredients.next"/>
	<button data-bind="click: add">Add</button><hr/>
	<ul data-bind="foreach: ingredients">
	    <li data-bind="text: $data"></li>
	</ul>
	
	<pre data-bind="text: ko.toJSON($root,null,2)"></pre>

	var Cocktail = function(name) {
	    this.name = ko.observable(name);
	    this.ingredients = ko.observableArray([]);
	
	    this.ingredients.next = ko.observable();
	    this.add = function(){
	        this.ingredients.push(this.ingredients.next());
	        this.ingredients.next("");
	    }
	};
	
	ko.applyBindings(new Cocktail("Ice Bomb"));


#Application Structure


###Plain Old JS Objects (POJOs)

    var cocktail = {
        name: ko.observable("Pimm's Cup"),
        type: ko.observable("Gin"),
        rating: 4.5
    };
    cocktail.heading = ko.computed(function(){
        return cocktail.name() + " (" + cocktail.type() + ', ' + cocktail.rating + "/5)";
    });



###Object Factories

    var cocktailFactory = function(spec){
        var that = {};
    
        that.name = ko.observable(spec.name);
        that.type = ko.observable(spec.type);
        that.rating = spec.rating;
        that.heading = ko.computed(function(){
            return that.name() + " (" + that.type() + ', ' + that.rating + "/5)";;
        });
        return that;
    };
    
    var vm = cocktailFactory({
        name: "Pimm's Cup",
        type: "Gin",
        rating: 4.5
    });


###Object Extenders

    var cocktailFactory = function(data){
    
        extend(data,{
            name: ko.observable(data.name),
            type: ko.observable(data.type)
        });
    
        extend(data,{
            title: ko.computed(function(){
                return data.name() + " (" + data.type() + ', ' + data.rating + "/5)";;
            })
        });
    
        return data;
    };


###Constructor Pattern

    var Cocktail = function(spec){
        var self = this;
        this.name = ko.observable(spec.name);
        this.type = ko.observable(spec.type);
        this.rating = spec.rating;
        self.title = ko.computed(function(){
            return self.name() + " (" + self.type() + ', ' + self.rating + "/5)";
        });
    };
    
    var vm = new Cocktail({
        name: "Pimm's Cup",
        type: "Gin",
        rating: 4.5
    });

###"Populate" Prototype Method

    var Cocktail = function(spec){
        var self = this;
        self.name = ko.observable();
        self.type = ko.observable();
        self.rating = null;
    
        self.populate(spec);
    
        self.title = ko.computed(function(){
            return self.name() + " (" + self.type() + ', ' + self.rating + "/5)";
        });
    };
    Cocktail.prototype.populate = function(spec){
        this.name(spec.name);
        this.type(spec.type);
        this.rating = spec.rating;
    };

###Managing Collections / Arrays

Simple Case:


    var Cocktail = function(spec){
        this.name = ko.observable(spec.name);
        this.type = ko.observable(spec.type);
    
        this.ingredients = ko.observableArray(spec.ingredients);
    };

So maybe we construct it with data from the server like this:

    var vm = new Cocktail({
        name: "Long Island Iced Tea",
        type: "Mixed",
        ingredients: [
            "vodka",
            "rum",
            "gin",
            "triple sec",
            "sweet and sour mix",
            "coke"
        ]
    });

But of course, in a real app, it will be rare for the collection to just be an array of string. It will likely be more complicated.  For instance, it might be an object hash:

    var vm = new Cocktail({
        name: "Long Island Iced Tea",
        type: "Mixed",
        ingredients: [
            {name:"vodka", amount: 1},
            {name:"rum", amount: 1},
            {name:"gin", amount: 1},
            {name:"triple sec", amount: 1},
            {name:"sweet and sour mix", amount: 1.5},
            {name:"coke", amount: 1}
        ]
    });

But even this is pretty conservative.

    var vm = new Cocktail({
        name: "Long Island Iced Tea",
        type: "Mixed",
        ingredients: [
            {name:"vodka", amount: 1, unit: "part"},
            {name:"rum", amount: 1, unit: "part"},
            {name:"gin", amount: 1, unit: "part"},
            {name:"triple sec", amount: 1, unit: "part"},
            {name:"sweet and sour mix", amount: 1.5, unit: "part"},
            {name:"coke", amount: 1, unit: "splash"}
        ]
    });

And hey, this is all probably persisted in a database somewhere, right?  Maybe we want to find other drinks with the same ingredients?  Or similar drinks?

    var vm = new Cocktail({
        id: 111,
        createdBy: {
            id: 256,
            name: "Leland Richardson"
        },
        name: "Long Island Iced Tea",
        type: "Mixed",
        ingredients: [
            {id: 123, name:"vodka", amount: 1, unit: "part"},
            {id: 345, name:"rum", amount: 1, unit: "part"},
            {id: 567, name:"gin", amount: 1, unit: "part"},
            {id: 432, name:"triple sec", amount: 1, unit: "part"},
            {id: 262, name:"sweet and sour mix", amount: 1.5, unit: "part"},
            {id: 821, name:"coke", amount: 1, unit: "splash"}
        ]
    });


This is still probably conservative, but we get the idea:

So at this point, these objects are needing a view model of their own, since they might have their own contained behavior.

    var Cocktail = function(spec){
        var self = this;
        self.id = null;
        self.name = ko.observable();
        self.type = ko.observable();
        self.createdBy = ko.observable();
        self.ingredients = ko.observableArray();
    
        self.populate(spec);
    };
    var Ingredient = function(spec){
        var self = this;
        self.id = null;
        self.name = ko.observable();
        self.amount = ko.observable();
        self.unit = ko.observable();
    
        self.populate(spec);
    };
    
    Cocktail.prototype.populate = function(data){
        this.id = data.id;
        this.name(data.name);
        this.type(data.type);
        this.unit(data.unit);
        this.ingredients.removeAll();
        this.ingredients.push.apply(this.ingredients.push,
            $.map(data.ingredients,function(ingredient){
                return new Ingredient(ingredient);
            })
        );
    };
    Ingredient.prototype.populate = function(data){
        this.id = data.id;
        this.name(data.name);
        this.amount(data.amount);
        this.unit(data.unit);
    };


There are two particularly annoying things we just did.

1. we wrote some very redundant mapping code that is unnecessary if we are not renaming things.
2. adding stuff to the ingredients array was more clunky than it probably ought to be...

--

    this.ingredients.removeAll();
    this.ingredients.push.apply(this.ingredients.push,
        $.map(data.ingredients,function(ingredient){
            return new Ingredient(ingredient);
        })
    );


That's not very readable.

So let's create something to make this a little more readable...

Here is an extension I built for Typed collections in knockout:

*Note: here just switch to IDE... or better yet, link to GitHub*

    (function(ko){
    
        var ctorKey = '__ko_typed_array_ctor__',
            toArray = function(args){
                return Array.prototype.slice.call(args, 0).sort();
            },
            cmap = function(array,Ctor){
                var i,
                    length = array.length,
                    results = [];
                for(i=0;i<length;i++){
                    results.push(new Ctor(array[i]));
                }
                return results;
            },
            newMethods = {};
    
        ko.utils.arrayForEach(["push", "unshift"], function (methodName) {
            newMethods[methodName] = function () {
                var needToMap = false,
                    mappedArguments;
                if(arguments[0] !== undefined && !(arguments[0] instanceof this[ctorKey])){
                    needToMap = true;
                    mappedArguments = cmap(toArray(arguments),this[ctorKey]);
                }
    
                // Use "peek" to avoid creating a subscription in any computed that we're executing in the context of
                // (for consistency with mutating regular observables)
                var underlyingArray = this.peek();
                this.valueWillMutate();
                var methodCallResult = underlyingArray[methodName].apply(underlyingArray, needToMap ? mappedArguments : arguments);
                this.valueHasMutated();
                return methodCallResult;
            };
        });
    
        newMethods['splice'] = function () {
            var needToMap = false,
                mappedArguments;
            if(arguments[2] !== undefined && !(arguments[2] instanceof this[ctorKey])){
                needToMap = true;
                mappedArguments = cmap(toArray(arguments).slice(2),this[ctorKey]);
                mappedArguments.unshift(arguments[0],arguments[1]);
            }
    
            // Use "peek" to avoid creating a subscription in any computed that we're executing in the context of
            // (for consistency with mutating regular observables)
            var underlyingArray = this.peek();
            this.valueWillMutate();
            var methodCallResult = underlyingArray['splice'].apply(underlyingArray, needToMap ? mappedArguments : arguments);
            this.valueHasMutated();
            return methodCallResult;
        };
    
        ko.observableArray.fn.ofType = function(Ctor){
            this[ctorKey] = Ctor;
            ko.utils.extend(this, newMethods);
            return this;
        };
    
    })(window.ko);


With this we can clean up our code a little bit:

this:

    this.ingredients.removeAll();
    this.ingredients.push.apply(this.ingredients.push,
        $.map(data.ingredients,function(ingredient){
            return new Ingredient(ingredient);
        })
    );

becomes:

    this.ingredients(data.ingredients);


Moving on it seems like we have some redundant code, so we create a simple mapping utility:

    ko.fromJS = function(model, data){
        var key;
        for(key in data)(function(key, fromServer, onModel){
            if(onModel !== undefined){
                if(ko.isObservable(onModel)){
                    model[key](fromServer);
                } else {
                    model[key] = fromServer;
                }
            }
        }(key, data[key], model[key]));
    };

And then we can achieve `.populate()` methods as simple as this:

    Cocktail.prototype.populate = function(data){
        ko.fromJS(this,data);
        // do special stuff here...
    };
    Ingredient.prototype.populate = function(data){
        ko.fromJS(this,data);
    };


#Writeable Computed Observables

We just saw this with the `.ofType()` extension I built, but I am going to show some simpler examples.

Writeable computed are great for containing small units of reusable application or view logic (thus, keeping your application DRY)

Say we want to have a "smart" text box of sorts that infers the first and last name of someone...


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
    
    
    ko.applyBindings({
        firstName: firstName,
        lastName: lastName,
        fullName: fullName
    });






###Events + Methods

We haven't really done anything with events or methods yet.  For the most part, they are pretty simple.







###Managing `this`

So often times people follow the "Constructor Pattern" in javascript.  This might mean a multitude of things, but it definitely means you will probably be using JavaScript's `this` keyword.

For example, I might have the following viewmodel constructor:

    var Cocktail = function(){
        this.name = ko.observable("Pimm's Cup");
        this.type = ko.observable("Gin");
        this.title  = ko.computed(function(){
            // uh oh, do we know that `this` is the right one?
            return this.name() + " (" + this.type() + ")";
        });
    };

but now I want to use knockout and add a computed observable on to this.

    // *** LIVE CODING *** //

    var Cocktail = function(){
        this.name = ko.observable("Pimm's Cup");
        this.type = ko.observable("Gin");
        this.title  = ko.computed(function(){
            // uh oh, do we know that `this` is the right one?
            return this.name() + " (" + this.type() + ")";
        });
    };

    // *** LIVE CODING *** //
    
    var Cocktail = function(){
        this.name = ko.observable("Pimm's Cup");
        this.type = ko.observable("Gin");
        this.title  = ko.computed(function(){
            // now we do!
            return this.name() + " (" + this.type() + ")";
        },this);
    };
    
if you're like me (and you usually care more about code readability than anything else), you might prefer to
just use a closure by aliasing `this` to some local variable.

    // *** LIVE CODING *** //

    var Cocktail = function(){
        var self = this; // alias `this`;
        self.name = ko.observable("Pimm's Cup");
        self.type = ko.observable("Gin");
        self.title  = ko.computed(function(){
            // reference properties by jumping up scope instead
            return self.name() + " (" + self.type() + ")";
        });
    };


###Building Widgets and pluggable components in Knockout

Often times you might be working on a larger project, and you are tasked to build some standalone widget that should be able to be inserted onto the page with no concern of getting in the way of other code.

    ko.applyBindings(viewModel, rootNode);

this is the full signature of `ko.applyBindings`.  The second parameter is a DOM node where knockout will begin binding your application.

So you are writing your knockout app and you do things the right way and you do something like this:

    <div id="mainApp">
        <h3 data-bind="text: title"></h3>
        <p data-bind="text: description"></p>
    </div>

    var mainApp = {
        title: "This is the application",
        description: "I haz lotz of code"
    };
    ko.applyBindings(mainApp,document.getElementById("mainApp"));

Then your other developer has a widget that they want to add to the page.  It has a different viewModel and doesn't depend on your code - so it's all gravy.  They just pop it in there...

    <div id="mainApp">
        <h3 data-bind="text: title"></h3>
        <p data-bind="text: description"></p>
    </div>
    <div id="myWidget">
        <span data-bind="click: beAwesome"></span>
    </div>

    var mainApp = {
        title: "This is the application",
        description: "I haz lotz of code"
    };
    ko.applyBindings(mainApp, document.getElementById("mainApp"));

    // .......

    var myWidget = {
        beAwesome: function() {
            alert("Sorry. You are not awesome :(");
        }
    };
    ko.applyBindings(myWidget, document.getElementById("myWidget"));


This works great.  But... what if your widget needs to go *inside* the `#mainApp` element?

    <div id="mainApp">
        <h3 data-bind="text: title"></h3>
        <p data-bind="text: description"></p>

        <div id="myWidget">
            <span data-bind="click: beAwesome"></span>
        </div>
    </div>


    var mainApp = {
        title: "This is the application",
        description: "I haz lotz of code"
    };
    ko.applyBindings(mainApp, document.getElementById("mainApp"));

    // .......

    var myWidget = {
        beAwesome: function() {
            alert("Sorry. You are not awesome :(");
        }
    };
    ko.applyBindings(myWidget, document.getElementById("myWidget"));

All of a sudden we are not so good...  we get an error and we see that knockout is looking for a `beAwesome` function off the `mainApp` object...

In comes the stopBinding custom handler...

    // stopBinding
    ko.bindingHandlers.stopBinding = {
        init: function () {
            return { controlsDescendantBindings: true };
        }
    };
    ko.virtualElements.allowedBindings.stopBinding = true;

Now, all you need to do is...

    <div id="mainApp">dir
        <h3 data-bind="text: title"></h3>
        <p data-bind="text: description"></p>

        <!-- ko stopBinding: true -->
        <div id="myWidget">
            <span data-bind="click: beAwesome"></span>
        </div>
        <!-- /ko -->
    </div>


    var mainApp = {
        title: "This is the application",
        description: "I haz lotz of code"
    };
    ko.applyBindings(mainApp, document.getElementById("mainApp"));

    // .......

    var myWidget = {
        beAwesome: function() {
            alert("Sorry. You are not awesome :(");
        }
    };
    ko.applyBindings(myWidget, document.getElementById("myWidget"));

And it all works!

#Custom Binding Handlers

	
	<div data-bind="yourBindingName: someValue"></div>
	
	ko.bindingHandlers.yourBindingName = {
	    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	        // This will be called when the binding is first applied to an element
	        // Set up any initial state, event handlers, etc. here
	    },
	    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	        // This will be called once when the binding is first applied to an element,
	        // and again whenever the associated observable changes value.
	        // Update the DOM element based on the supplied values here.
	    }
	};
	
So remember when we did that `valueUpdate: 'afterkeydown'` thing earlier?  I do that an awful lot, and it's a long and ugly string... so let's fix that.


	// ** LIVE CODING **

	ko.bindingHandlers.dynamicValue = {
	    init: function (element, valueAccessor, allBindingsAccessor) {
	        var newAllBindingsAccessor = function() {
	            return ko.utils.extend(
	                allBindingsAccessor(),
	                {valueUpdate: 'afterkeydown'});
	        };
	        ko.bindingHandlers.value.init(
	            element,
	            valueAccessor,
	            newAllBindingsAccessor);
	    },
	    update: ko.bindingHandlers.value.update
	};
	

** now go to next state and bring in the HTML and viewmodel...

now show progress bar  (super easy jQuery plugin integration...)

	<h3>Progress Bar</h3>
	<div data-bind="progressBar: complete"></div>
	<a class="btn" data-bind="click: increment">Increment</a>
	
	var unwrap = ko.utils.unwrapObservable;
	ko.bindingHandlers.progressBar = {
	    init: function(element,valueAccessor){
	        $(element).progressbar({ value: unwrap(valueAccessor())});
	    },
	    update: function(element,valueAccessor){
	        $(element).progressbar("option", "value", unwrap(valueAccessor()));
	    }
	};
	var vm = {
	    complete: ko.observable(22),
	    increment: function() {this.complete(this.complete()+1);}
	};
	ko.applyBindings(vm);
	

then show clickToEdit... no dependencies on jquery...  also shows how you can append child elements etc...

	<div data-bind="clickToEdit: label"></div>
	
	ko.bindingHandlers.clickToEdit = {
	    init: function(element, valueAccessor) {
	        var observable = valueAccessor(),
	            link = document.createElement("a"),
	            input = document.createElement("input");
	        element.appendChild(link);
	        element.appendChild(input);
	
	        observable.editing = ko.observable(false);
	
	        ko.applyBindingsToNode(link, {
	            text: observable,
	            hidden: observable.editing,
	            click: function() { observable.editing(true); }
	        });
	
	        ko.applyBindingsToNode(input, {
	            value: observable,
	            visible: observable.editing,
	            hasfocus: observable.editing
	        });
	    }
	};
	
	var vm = {
	    label: ko.observable("Click me to edit!")
	};

	ko.applyBindings(vm);
	

When working with knockout, you might find yourself doing certain things over and over again. Boilerplate.  It's your responsibility to stay DRY in these scenarios.  Here are some ways to avoid some knockout bloat:

Here is a scenario pretty much every web app will benefit from: buttons.

Say we have a button which we would like to have enabled/disabled based on some observable.  Initially we might do it like this:


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

now...

    <button data-bind="click: save, enable: saveEnabled"></button>

now...

    <button data-bind="button: save"></button>

now...

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

the way we do this is...

    var button = function(spec){
        return ko.utils.extend(function(){},{
            click: spec.click || function(){},
            enable: spec.enable || ko.observable(true),
            text: spec.text
        });
    };

with the binding handler:

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



###Dirty Tracking

Dirty tracking can be accomplished in a fairly clean way using knockout.  

One might be able to accomplish something like that by doing this:

    var isDirty = function(state){
        var initial = ko.toJS(state);
        return ko.computed(function(){
            return ko.toJSON(initial()) !== ko.toJSON(state);
        });
    };

This could be used as follows:

    var Cocktail = function(){
        this.ingredients = ko.observableArray([]);
        this.ingredientsAreDirty = isDirty(this.ingredients);
    };

This works okay, but at some point you will want to 

Ryan Neimeyer created an object used precisely for this purpose which is quite handy:

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

....






#Working With the Server

###Loading Data Asynchronously





##Do I want these in here?

- delegated event binding/handling with my 'on' binding
- href/title/src shortcut bindings
- "hidden" shortcut binding
- knockout validation plugin
- AutocompleteJS custom binding
- widgets with stopBinding
- "timeAgo" datetime binding
- dirtyFlag: how it works, how to use it
- my modelEditor stuff?
- extensions like fn.asPositiveInteger
- currency binding
- asMarkdown() extension method with .asHtml()


- build a small service to return cocktail json