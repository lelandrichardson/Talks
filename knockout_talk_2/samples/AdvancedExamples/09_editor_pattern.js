var Cocktail = ko.modelEditor(function(spec){
    this.first = ko.observable();
    this.last = ko.observable();
    this.username = ko.observable();

    this.initialize(spec);
});

var vm = new Cocktail({
    first: "Leland",
    last: "Richardson",
    username: "intelligiblebabble"
});

ko.applyBindings(vm);