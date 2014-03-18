var cocktail = {
    name: ko.observable("Gin & Tonic"),
    rating: 9.5
};

cocktail.displayName = ko.computed(function() {
    return cocktail.name() + ' (' + cocktail.rating + ')';
});

ko.applyBindings(cocktail);