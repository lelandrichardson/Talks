ko.bindingHandlers.clickToEdit = {
    init: function(element, valueAccessor) {
        var observable = valueAccessor(),
            link = document.createElement("a"),
            input = document.createElement("input");
        element.appendChild(link);
        element.appendChild(input);

        observable.editing = ko.observable(false);

        ko.applyBindingsToNode(link, {
            text: observable,
            hidden: observable.editing,
            click: function() { observable.editing(true); }
        });

        ko.applyBindingsToNode(input, {
            value: observable,
            visible: observable.editing,
            hasfocus: observable.editing
        });
    }
};
ko.applyBindings({value: ko.observable("Click me to Edit!")});