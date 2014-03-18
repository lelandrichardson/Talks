var isDirty = function(state){
    var initial = ko.toJS(state);
    return ko.computed(function(){
        return ko.toJSON(initial()) !== ko.toJSON(state);
    });
};

var Cocktail = function(){
    this.ingredients = ko.observableArray([]);
    this.ingredientsAreDirty = isDirty(this.ingredients);
};