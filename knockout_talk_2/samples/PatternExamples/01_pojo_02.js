var cocktail = {
    name: ko.observable("Pimm's Cup"),
    type: ko.observable("Gin")
};
cocktail.heading = ko.computed(function(){
    return cocktail.name() + " (" + cocktail.type() + ', ' + cocktail.rating + "/5)";
});