var Cocktail = function(){
    this.name = ko.observable("Pimm's Cup");
    this.type = ko.observable("Gin");
    this.title  = ko.computed(function(){
        // now we do!
        return this.name() + " (" + this.type() + ")";
    },this);
};