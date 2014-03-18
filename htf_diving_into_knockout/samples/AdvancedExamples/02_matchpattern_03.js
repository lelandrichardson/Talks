var safeValue = /^[a-zA-Z0-9]*$/;

ko.observable.fn.ofPattern = function(pattern){

};

ko.applyBindings({
    value: ko.observable("test").ofPattern(safeValue)
});