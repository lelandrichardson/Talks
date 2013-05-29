var WIDGET_KEY = "ko__autocompletejs_widget";
ko.bindingHandlers.autocomplete = {
    init: function(element, valueAccessor){
        var cfg = ko.unwrap(valueAccessor()),
            options = cfg.options,
            value = cfg.value,
            onchange = options.onChange || function(){};
        options = ko.toJS(options);

        options.onChange = function(newValue,oldValue){
            if(value){
                value(newValue);
            }
            //call original handler if user passed it in
            onchange(newValue,oldValue);
        };

        var ac = new AutoComplete(element,options);

        ko.utils.domData.set(element, WIDGET_KEY, ac);

        return { controlsDescendantBindings: true };
    },
    update: function(element, valueAccessor){
        var ac = ko.utils.domData.get(element,WIDGET_KEY),
            cfg = ko.unwrap(valueAccessor());

        ac.setValue(ko.unwrap(cfg.value));
    }
};