var Cocktail = function() {
    this.next = ko.observable();
    this.ingredients = ko.observableArray([]);
    this.add = function(data,event){
        this.ingredients.push(this.next());
        this.next("");
    }
};

ko.applyBindings(new Cocktail());