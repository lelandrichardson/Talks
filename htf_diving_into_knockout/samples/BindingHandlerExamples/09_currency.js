var toCurrency = function(amount){
    return '$' + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
};
ko.bindingHandlers.currency = {
    update: function(element, valueAccessor){
        return ko.bindingHandlers.text.update(element,function(){
            var value = ko.unwrap(valueAccessor());
            return toCurrency(value || 0);
        });
    }
};

var amount = ko.observable(2),
    price = ko.observable(22.5),
    total = ko.computed(function(){return amount() * price();});

ko.applyBindings({amount: amount, price: price, total: total});