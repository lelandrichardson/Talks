var Cocktail = function(){
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    self.rating = ko.observable();
    self.ingredients = ko.observableArray();
};

// restify(<Constructor>, <resource_name>);
restify(Cocktail, 'cocktail');

var instance = Cocktail.get(123);
ko.applyBindings(instance);