// when used in a binding of an element,
// all child nodes will be "skipped" in binding process
ko.bindingHandlers.stopBinding = {
    init: function () {
        return { controlsDescendantBindings: true };
    }
};
ko.virtualElements.allowedBindings.stopBinding = true;