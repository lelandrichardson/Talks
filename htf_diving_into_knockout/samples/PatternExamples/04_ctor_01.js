var Cocktail = function(spec){
    var self = this;
    self.name = ko.observable(spec.name);
    self.type = ko.observable(spec.type);
    self.rating = spec.rating;

    self.title = ko.computed(function(){
        return self.name() + " (" + self.type() + ', ' + self.rating + "/5)";
    });
};

var vm = new Cocktail({
    name: "Pimm's Cup",
    type: "Gin",
    rating: 4.5
});