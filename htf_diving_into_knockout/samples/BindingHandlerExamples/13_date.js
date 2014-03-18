if($.datepicker){
    ko.bindingHandlers.date = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            return ko.bindingHandlers.text.update(element,function(){
                    var value = ko.unwrap(valueAccessor()),
                        dateFormat = ko.unwrap(allBindingsAccessor().dateFormat ||
                            ko.bindingHandlers.date.defaultFormat),
                        date = new Date(value);
                    return $.datepicker.formatDate(dateFormat, date);
            });
        },
        defaultFormat: 'mm-dd-yy'
    };
}
ko.applyBindings({date: new Date(), format: ko.observable('mm-dd-yy')});