var unwrap = ko.utils.unwrapObservable;
ko.bindingHandlers.progressBar = {
    init: function(element,valueAccessor){
        $(element).progressbar({ value: unwrap(valueAccessor())});
    },
    update: function(element,valueAccessor){
        $(element).progressbar("option","value",unwrap(valueAccessor()));
    }
};
var vm = {
    complete: ko.observable(22),
    increment: function() {this.complete(this.complete()+1);}
};
ko.applyBindings(vm);
