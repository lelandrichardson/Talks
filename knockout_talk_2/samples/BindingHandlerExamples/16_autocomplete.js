var WIDGET_KEY = "ko__autocompletejs_widget";
ko.bindingHandlers.autocomplete = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var cfg = ko.unwrap(valueAccessor()),
            options = cfg.options,
            value = cfg.value,
            onchange = options.onChange || function(){};
        options = ko.toJS(options);
        // build intercepting onChange handler
        // build widget
        // save reference to widget on domElement
        // control descendant bindings
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        // get widget from DOM
        // setValue
    }
};