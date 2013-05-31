var cocktail = {
    name: ko.observable("Pimm's Cup"),
    type: ko.observable("Gin"),
    rating: 4.5
};
cocktail.heading = ko.computed(function(){
    return cocktail.name() + " (" + cocktail.type() + ', ' + cocktail.rating + "/5)";
});