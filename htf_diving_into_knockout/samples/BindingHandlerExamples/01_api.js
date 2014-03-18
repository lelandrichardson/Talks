ko.bindingHandlers.customBindingName = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // called once, per element, on initial binding
        // set up state / bind to events here / etc
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // respond to updates from observables we depend on
    }
};