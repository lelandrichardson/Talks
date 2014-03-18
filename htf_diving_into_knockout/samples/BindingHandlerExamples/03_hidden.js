ko.bindingHandlers.hidden = {
    update: function (element, valueAccessor) {
        ko.bindingHandlers.visible.update(element, function () {
            return !ko.unwrap(valueAccessor());
        });
    }
};

ko.applyBindings({busy: ko.observable(false)});