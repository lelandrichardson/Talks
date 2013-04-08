define(["knockout"], function(ko) {
    return function() {
        this.title = "It's a library, not a framework";
        this.allPoints = [
            { title: "Knockout doesn't dictate how you structure your code"},
            { title: "Knockout provides bindings and plumbing"},
            { title: "You are still responsible for writing clean code..."},
            { title: "It makes writing UI logic fun again"},
            { title: "Abstracts away the DOM"},
            { title: "14kb, zero dependencies"}
        ];

        this.points = ko.observableArray();

        //add the top point to the list of displayed points
        this.next = function() {
            if (this.allPoints.length) {
                this.points.push(this.allPoints.shift());
            }
        };

        //step back
        this.previous = function() {
            if (this.points().length) {
                this.allPoints.unshift(this.points.pop());
            }
        };
    };
});