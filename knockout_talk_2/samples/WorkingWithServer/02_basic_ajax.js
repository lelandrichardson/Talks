var Cocktail = function(){
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    self.rating = ko.observable();
    self.ingredients = ko.observableArray();
};