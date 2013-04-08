var viewModel = {
    first: ko.observable("Jim"),
    last: ko.observable("Bob")
};
viewModel.displayText = ko.computed(function() {
   return "Hello " + this.first() + " " + this.last() + "!";
}, viewModel);

ko.applyBindings(viewModel);