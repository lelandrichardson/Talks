var cocktailFactory = function(data){
    //make some properties observable
    extend(data,{
        name: ko.observable(data.name),
        type: ko.observable(data.type)
    });
    // add computed properties
    extend(data,{
        title: ko.computed(function(){
            return data.name() + " (" + data.type() + ', ' + data.rating + "/5)";;
        })
    });
    // add events, etc.
    return data;
};

var vm = cocktailFactory({
    name: "Pimm's Cup",
    type: "Gin",
    rating: 4.5
});