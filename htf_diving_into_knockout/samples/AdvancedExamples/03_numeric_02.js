ko.observable.fn.asPositiveInteger = function(defaultForBadValue){
    var original = this,
        interceptor = ko.computed({
            read: original,
            write: function(newValue){
                var parsed = parseInt(newValue, 10);
                if(isNaN(parsed) || parsed < 0){
                    parsed = defaultForBadValue;
                }
                original(parsed);
            }
        });

    interceptor(original());

    return interceptor;
};

var amount = ko.observable(2).asPositiveInteger(0),
    price = ko.observable(22.5),
    total = ko.computed(function(){return amount() * price();});

ko.applyBindings({
    amount: amount,
    price: price,
    total: total
});