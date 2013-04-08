define(["knockout", "sample"], function(ko, Sample) {

    return new Sample("Hello Word in Knockout.js", "BindingExamples", [
        new Sample.State("Bind Raw Objects","rawjs"),
        new Sample.State("Bind Observables","observables"),
        new Sample.State("Computed Observables", "computed"),
        new Sample.State("Observable Arrays", "arrays")
    ], true);  //this last true tells it to load each sample immediately when moving to it

});