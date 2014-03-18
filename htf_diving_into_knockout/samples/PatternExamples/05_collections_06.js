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


var dataFromServer = {
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
};