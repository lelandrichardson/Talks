var cocktail = {
    name: ko.observable("Pimm's Cup"),
    type: ko.observable("Gin")
};
cocktail.title = ko.computed(function(){
    // uh oh, do we know that `this` is the right one?
    return this.name() + " (" + this.type() + ")";
});