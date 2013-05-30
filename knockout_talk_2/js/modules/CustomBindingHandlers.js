define(["knockout"], function(ko) {
    return function() {
        this.title = "Custom Binding Handlers";
        this.allPoints = [
            { title: "Should be part of every knockout.js programmer's toolbelt"},
            { title: "They *really* are easy to understand.  I promise."},
            { title: "Utilize (and augment) the bindings provided by the library"},
            { title: "Encapsulate logic to write cleaner (and more clear) UI code"},
            { title: "Leads to less code, more expressive markup"},
            { title: "*Never* write DOM code in your ViewModel again!"},
            { title: "Analogous to Angular.js directives"}
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