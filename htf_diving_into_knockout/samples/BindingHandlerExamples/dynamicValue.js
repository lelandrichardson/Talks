ko.bindingHandlers.dynamicValue = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var newAllBindingsAccessor = function() {
            return ko.utils.extend(
                allBindingsAccessor(),
                {valueUpdate: 'afterkeydown'});
        };
        ko.bindingHandlers.value.init(
            element,
            valueAccessor,
            newAllBindingsAccessor);
    },
    update: ko.bindingHandlers.value.update
};

ko.applyBindings({data: ko.observable("this is live")});