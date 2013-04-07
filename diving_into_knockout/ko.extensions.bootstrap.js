// BINDING HANDLERS (jQuery + bootstrap dependencies)
// ---------------------------------------------------------------------
;(function(ko, $){
    var unwrap = ko.utils.unwrapObservable,
        extend = ko.utils.extend,
        forEach = $.each;

    ko.bindingHandlers.modal = {
        init: function(element, valueAccessor){
            $(element).modal({show: false});
            return ko.bindingHandlers.with.init.apply(this,arguments);
        },
        update: function(element, valueAccessor){
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).modal(value ? "show" : "hide");
            return ko.bindingHandlers.with.update.apply(this,arguments);
        }
    };

}(window.ko, window.jQuery));