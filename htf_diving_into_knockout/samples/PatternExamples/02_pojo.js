//POJO
var cocktail = {
    name: ko.observable("Pimm's Cup"),
    type: ko.observable("Gin"),
    rating: 4.5
};
cocktail.heading = ko.computed(function(){
    return cocktail.name() + " (" + cocktail.type() + ', ' + cocktail.rating + "/5)";
});


// ------------------

//object factories (behave like constructors
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

// -------------------
//object extenders
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

var vm = cocktailFactory({
    name: "Pimm's Cup",
    type: "Gin",
    rating: 4.5
});


//
// ----------------------------------------------------------
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

//
// ----------------------------------------------------------

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

//
// ----------------------------------------------------------

var Cocktail = function(spec){
    var self = this;
    self.name = ko.observable();
    self.type = ko.observable();
    self.rating = null;

    ko.fromJS(this,spec);

    self.title = ko.computed(function(){
        return self.name() + " (" + self.type() + ', ' + self.rating + "/5)";
    });
};

//
// ----------------------------------------------------------

var Cocktail = function(spec){
    this.name = ko.observable(spec.name);
    this.type = ko.observable(spec.type);

    this.ingredients = ko.observableArray(spec.ingredients);
};

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




//
// ----------------------------------------------------------

var Cocktail = function(spec){
    var self = this;
    self.id = null;
    self.name = ko.observable();
    self.type = ko.observable();
    self.createdBy = ko.observable();
    self.ingredients = ko.observableArray().ofType(Ingredient);

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
    this.ingredients(data.ingredients);
};
Ingredient.prototype.populate = function(data){
    this.id = data.id;
    this.name(data.name);
    this.amount(data.amount);
    this.unit(data.unit);
};

// --------------------------------------
// with .ofType()

Cocktail.prototype.populate = function(data){
    this.id = data.id;
    this.name(data.name);
    this.type(data.type);
    this.unit(data.unit);
    this.ingredients(data.ingredients);
};
Ingredient.prototype.populate = function(data){
    this.id = data.id;
    this.name(data.name);
    this.amount(data.amount);
    this.unit(data.unit);
};
// -------------------------------------
// with .ofType() and ko.fromJS


Cocktail.prototype.populate = function(data){
    ko.fromJS(this,data);
    // do special stuff here...
};
Ingredient.prototype.populate = function(data){
    ko.fromJS(this,data);
};





// events: on the instance or on the prototype
// ajax - with or without mapping
// editor pattern
// dirty tracking
//xxx writeable computed...
//xxx collections...  think about .ofType(Ctor);



//** WRITEABLE COMPUTED OBSERVABLES


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

ko.applyBindings({
    value: value,
    valueToEdit: valueToEdit
});

// --------------------------------------------


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


ko.applyBindings({
    value: value,
    valueToEdit: valueToEdit
});

// ---------------------------------------------

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

// -------------------------------------------------

// as number

// ------------------------------------------------

// as positive integer

// -----------------------