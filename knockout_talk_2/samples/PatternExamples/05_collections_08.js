var Cocktail = function(spec){
    var self = this;
    self.id = null;
    self.name = ko.observable();
    self.type = ko.observable();
    self.createdBy = ko.observable();
    // link: http://bit.ly/10IXsVc
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
    ko.fromJS(this,data);
};
Ingredient.prototype.populate = function(data){
    ko.fromJS(this,data);
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

// simple mapping function
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

var vm = new Cocktail(dataFromServer);
ko.applyBindings(vm);