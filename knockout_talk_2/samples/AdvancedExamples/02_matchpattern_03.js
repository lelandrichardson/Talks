var safeValue = /^[a-zA-Z0-9]*$/;

ko.observable.fn.ofPattern = function(pattern){
    var original = this,
        interceptor = ko.computed({
            read: original,
            write: function(newValue){
                if(pattern.test(newValue)) {
                    original(newValue);
                } else {
                    original.notifySubscribers();
                }
            }
        });

    interceptor(original());

    return interceptor;
};

ko.applyBindings({
    value: ko.observable("test").ofPattern(safeValue)
});