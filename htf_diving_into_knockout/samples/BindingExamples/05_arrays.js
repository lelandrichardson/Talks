var Cocktail = function(name) {
    this.name = ko.observable(name);
    this.ingredients = ko.observableArray([]);

    this.next = ko.observable("");
    this.add = function(){
        this.ingredients.push(this.next());
        this.next("");
    }
};

ko.applyBindings(new Cocktail("Ice Bomb"));