var amount = ko.observable(2),
    price = ko.observable(22.5),
    total = ko.computed(function(){return amount() * price();});

ko.applyBindings({
    amount: amount,
    price: price,
    total: total
});