define([
    "knockout",
    "sample",
    "ko.extensions"
],
function(ko, Sample) {

    return new Sample("Hello World in Knockout.js", "BindingExamples", [
        new Sample.State("The Old Way","01_raw_jquery"),
        new Sample.State("The Old Way","02_raw_jquery"),
        new Sample.State("The Old Way","02_raw_jquery_2"),
        new Sample.State("Basic Binding","03_raw_ko"),
        new Sample.State("Computed Observables","04_ko_computed"),
        new Sample.State("Working with Arrays","05_arrays"),
        new Sample.State("Working with Arrays","06_arrays"),


//        new Sample.State("Bind Raw Objects","rawjs"),
//        new Sample.State("Bind Observables","observables"),
//        new Sample.State("Computed Observables", "computed"),
//        new Sample.State("Observable Arrays", "arrays")
    ], true);  //this last true tells it to load each sample immediately when moving to it

});