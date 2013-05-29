var Cocktail = function(){
    this.name = ko.observable("Pimm's Cup");
    this.type = ko.observable("Gin");
    this.title  = ko.computed(function(){
        // uh oh, do we know that `this` is the right one?
        return this.name() + " (" + this.type() + ")";
    });
};