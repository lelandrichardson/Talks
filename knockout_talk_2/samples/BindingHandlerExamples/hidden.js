ko.bindingHandlers.hidden = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        ko.bindingHandlers.visible.update(element, function () {
            return !value;
        });
    }
};

ko.applyBindings({busy: ko.observable(false)});