var Cocktail = function(){
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    self.rating = ko.observable();
    self.ingredients = ko.observableArray();
};

extend(Cocktail.prototype,{
    load: function(){
        var self = this;
        GET({
            url: '/cocktail/' + self.id(),
            success: function(data){
                self.name(data.name);
                self.rating(data.rating);
                self.ingredients(data.ingredients);
                console.log("loaded from server!");
            }
        });
    }
});