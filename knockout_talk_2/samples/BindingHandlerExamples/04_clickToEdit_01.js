ko.applyBindings({
    value: ko.observable("Click me to Edit!"),
    editing: ko.observable(false),
    editMode: function(){
        this.editing(true);
    }
});