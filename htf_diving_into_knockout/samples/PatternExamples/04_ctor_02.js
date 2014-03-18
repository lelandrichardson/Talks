var Cocktail = function(spec){
    var self = this;
    self.name = ko.observable();
    self.type = ko.observable();
    self.rating = null;

    self.populate(spec);

    self.title = ko.computed(function(){
        return self.name() + " (" + self.type() + ', ' + self.rating + "/5)";
    });
};
Cocktail.prototype.populate = function(spec){
    this.name(spec.name);
    this.type(spec.type);
    this.rating = spec.rating;
};

var vm = new Cocktail({
    name: "Pimm's Cup",
    type: "Gin",
    rating: 4.5
});