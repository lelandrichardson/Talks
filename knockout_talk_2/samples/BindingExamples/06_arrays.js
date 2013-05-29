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