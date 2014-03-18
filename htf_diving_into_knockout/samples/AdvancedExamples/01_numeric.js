var Cocktail = function(){
    var self = this;
    self.name = ko.observable("Gin & Tonic");
    self.rating = ko.observable();
};


var Cocktail = function(){
    var self = this;
    self.name = ko.observable("Gin & Tonic");
    self.ratingForEdit = ko.observable(0);
    self.rating = ko.computed(function(){
        var parsedValue = parseFloat(self.ratingForEdit());
        return isNaN(parsedValue) ? 0 : parsedValue;
    });
};


ko.numericObservable = function (initialValue) {
    var _actual = ko.observable(initialValue);

    var result = ko.computed({
        read: function () {
            return _actual();
        },
        write: function (newValue) {
            var parsedValue = parseFloat(newValue);
            _actual(isNaN(parsedValue) ? newValue : parsedValue);
        }
    });

    return result;
};

var Cocktail = function(){
    var self = this;
    self.name = ko.observable("Gin & Tonic");
    self.rating = ko.numericObservable(0);
};


ko.observable.fn.asNumeric = function(defaultForBadValue){
    var original = this,
        interceptor = ko.computed({
            read: original,
            write: function(newValue){
                var parsedValue = parseFloat(newValue);
                //if value is bad or negative, then use default
                original(isNaN(parsedValue) ? defaultForBadValue : parsedValue);
            }
        });
    //process the initial value
    interceptor(original());

    //return this new writeable computed to "stand in front of" our original observable
    return interceptor;
};

var Cocktail = function(){
    var self = this;
    self.name = ko.observable("Gin & Tonic");
    self.rating = ko.observable().asMumeric(0);
};

ko.observable.fn.asPositiveInteger = function(defaultForBadValue){
    var original = this,
        interceptor = ko.computed({
            read: original,
            write: function(newValue){
                var parsed = parseInt(newValue, 10);
                //if value is bad or negative, then use default
                if(isNaN(parsed) || parsed < 0){
                    parsed = defaultForBadValue;
                }
                original(parsed);
            }
        });
    //process the initial value
    interceptor(original());

    //return this new writeable computed to "stand in front of" our original observable
    return interceptor;
};