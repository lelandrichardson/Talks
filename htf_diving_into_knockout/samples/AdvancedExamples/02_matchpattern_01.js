var safeValue = /^[a-zA-Z0-9]*$/;
var value = ko.observable("test"),
    valueIsSafe = ko.computed(function(){
        return safeValue.test(value());
    });

ko.applyBindings({
    value: value,
    valueIsSafe: valueIsSafe
});