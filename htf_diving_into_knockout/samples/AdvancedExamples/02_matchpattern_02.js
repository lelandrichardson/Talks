var safeValue = /^[a-zA-Z0-9]*$/;
var value = ko.observable("test"),
    valueToEdit = ko.computed({
        read: value,
        write: function(newValue){
            if(safeValue.test(newValue)) {
                value(newValue);
            } else {
                value.notifySubscribers();
            }
        }
    });

ko.applyBindings({
    value: value,
    valueToEdit: valueToEdit
});