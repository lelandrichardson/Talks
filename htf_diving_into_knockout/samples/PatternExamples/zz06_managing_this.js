var Cocktail = function(){
    var self = this; // alias `this`;
    self.name = ko.observable("Pimm's Cup");
    self.type = ko.observable("Gin");
    self.title  = ko.computed(function(){
        // reference properties by jumping up scope instead
        return self.name() + " (" + self.type() + ")";
    });
};