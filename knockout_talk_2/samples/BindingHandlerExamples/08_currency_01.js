var toCurrency = function(amount){
    return '$' + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
};

var amount = ko.observable(2),
    price = ko.observable(22.5),
    total = ko.computed(function(){return amount() * price();}),
    displayTotal = ko.computed(function(){
        return toCurrency(total()||0);
    }),
    displayPrice = ko.computed(function(){
        return toCurrency(price()||0);
    });

ko.applyBindings({
    amount: amount,
    price: price, displayPrice: displayPrice,
    total: total, displayTotal: displayTotal
});