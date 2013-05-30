var dirtyFlag = function(state){
    // we want to track state's changes
    return { isDirty: ko.observable(false)};
};

var Cocktail = function(){
    var self = this;
    self.name = ko.observable("Long Island Iced Tea");
    self.rating = ko.observable(3);
    self.ingredients = ko.observableArray([
        "triple sec",
        "sweet and sour mix",
        "coke"
    ]);

    self.ingredients.next = ko.observable();
    self.ingredients.add = function(){
        self.ingredients.push(self.ingredients.next())
        self.ingredients.next("");
    };
    self.remove = function(data){
        self.ingredients.remove(data);
    };

    self.dirtyFlag = dirtyFlag(self);
};
ko.applyBindings(new Cocktail());