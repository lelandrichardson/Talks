

//old way

var Cocktail = function(id){
    this.id = ko.observable(id);
    this.name = ko.observable();
    this.rating = ko.observable();
    this.ingredients = ko.observableArray();
};
Cocktail.prototype.fromJS = function(data){
    this.id(data.id);
    this.name(data.name);
    this.rating(data.rating);
    this.ingredients(data.ingredients);
};


// can get mroe complicated....
var Cocktail = function(id){
    this.id = ko.observable(id);
    this.name = ko.observable();
    this.rating = ko.observable();
    this.ingredients = ko.observableArray(); //Array<Ingredient>
};
var Ingredient = function(spec){
    this.name = ko.observable(spec.name);
    this.amount = ko.observable(spec.amount);
};
Cocktail.prototype.fromJS = function(data){
    this.id(data.id);
    this.name(data.name);
    this.rating(data.rating);

    //map the POJO array to an Array<Ingredient>
    this.ingredients($.map(data.ingredients,function(ingredient){
        return new Ingredient(ingredient);
    }));
};

// enter in knockout mapping
Cocktail.prototype.fromJS = function(data){
    ko.mapping.fromJS(data, {}, this);
};

// enter in knockout mapping
Cocktail.mapping = {
    ingredients: {
        create: function(opts){
            return new Ingredient(opts.data);
        }
    }
};
Cocktail.prototype.fromJS = function(data){
    ko.mapping.fromJS(data, Cocktail.mapping, this);
};


var Cocktail = function(id){
    this.id = ko.observable(id);
    this.name = ko.observable();
    this.rating = ko.observable();
    this.ingredients = ko.observableArray(); //Array<Ingredient>
};

