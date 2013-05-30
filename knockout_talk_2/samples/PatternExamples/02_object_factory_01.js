var cocktailFactory = function(spec){
    var that = {};

    that.name = ko.observable(spec.name);
    that.type = ko.observable(spec.type);
    that.rating = spec.rating;
    that.heading = ko.computed(function(){
        return that.name() + " (" + that.type() + ', ' + that.rating + "/5)";;
    });
    return that;
};

var vm = cocktailFactory({
    name: "Pimm's Cup",
    type: "Gin",
    rating: 4.5
});