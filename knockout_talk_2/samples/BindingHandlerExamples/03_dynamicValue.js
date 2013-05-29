ko.bindingHandlers.dynamicValue = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        return ko.bindingHandlers.value.init(element, valueAccessor, function(){
                return ko.utils.extend(allBindingsAccessor(), {valueUpdate: 'afterkeydown'});
        });
    },
    update: ko.bindingHandlers.value.update
};