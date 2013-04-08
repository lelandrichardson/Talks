var student = {
    first: ko.observable("John"),
    last: ko.observable("Doe"),
    grade: ko.observable("Senior"),
    classes: ko.observableArray([
        {name: "Math", gpa: ko.observable(3.3)},
        {name: "Physics", gpa: ko.observable(4.0)},
        {name: "English", gpa: ko.observable(3.5)},
        {name: "History", gpa: ko.observable(3.8)}
    ])
};
student.fullName = ko.computed(function() {
    return this.first() + " " + this.last();
}, student);

student.gpa = ko.computed(function() {
    var classes = this.classes(),
        sum = 0,
        count = 0;
        classes.forEach(function(obj){
            sum += obj.gpa(); count++;
        });
    return sum / count;
}, student);
