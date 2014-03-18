var Cocktail = function(spec){
    this.name = ko.observable(spec.name);
    this.type = ko.observable(spec.type);

    this.ingredients = ko.observableArray(spec.ingredients);
};