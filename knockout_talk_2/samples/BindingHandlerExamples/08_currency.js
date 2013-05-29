var toCurrency = function(amount){
    return '$' + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
};
ko.bindingHandlers.currency = {
    init: function (element, valueAccessor, allBindingsAccessor) {

    },
    update: function (element, valueAccessor, allBindingsAccessor) {

    }
};