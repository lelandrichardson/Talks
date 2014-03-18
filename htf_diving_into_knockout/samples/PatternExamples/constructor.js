var Student = function(spec){
    this.first = ko.observable("John");
    this.last = ko.observable("Doe");
    this.grade = ko.observable("Senior");
    this.classes = ko.observableArray(_.map(spec.classes,
        function(c){return new Class(c);})
    );
    this.fullName = ko.computed(function() {
        return this.first() + " " + this.last();
    }, this);
    this.gpa = ko.computed(function() {
        var classes = this.classes(),
            sum = 0,
            count = 0;
        classes.forEach(function(obj){
            sum += obj.gpa(); count++;
        });
        return sum / count;
    }, this);
};

var Class = function(spec) {
    this.name = spec.name;
    this.gpa = ko.observable(spec.gpa || 0);
};

var studentFromServer = {
    first: "John", last: "Doe", classes: [{name: "English",gpa: 3.8},{name: "Biology",gpa: 3.5}]
};

