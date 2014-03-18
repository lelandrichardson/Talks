var safeValue = /^[a-zA-Z0-9]*$/;
var value = ko.observable("test"),
    valueToEdit = ko.computed({
        read: function(){
            // return value
        },
        write: function(newValue){
            // obj is being set to newValue
        }
    });

ko.applyBindings({
    value: value,
    valueToEdit: valueToEdit
});