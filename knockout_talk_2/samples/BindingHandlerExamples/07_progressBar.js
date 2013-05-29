if($.fn.progressbar){
    ko.bindingHandlers.progressBar = {
        init: function(element, valueAccessor){
            $(element).progressbar({ value: ko.unwrap(valueAccessor())});
        },
        update: function(element, valueAccessor){
            $(element).progressbar("option","value",ko.unwrap(valueAccessor()));;
        }
    }
}