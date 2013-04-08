define([
    "knockout",
    "sample",
    "jquery",
    "jquery-ui"
],
function(ko, Sample, $) {

    return new Sample("Custom Binding Handlers", "BindingHandlerExamples", [
        new Sample.State("API","api", {hideResult: true}),
        new Sample.State("Utilize Existing Handlers","dynamicValue"),
        new Sample.State("Utilize Existing Handlers","hidden"),
        new Sample.State("Create and Handle Child nodes","clickToEdit"),
        new Sample.State("Utilize other plugins / libraries easily","progressbar"),
        new Sample.State("Computed Observables", "computed"),
        new Sample.State("Observable Arrays", "arrays")
    ], true);  //this last true tells it to load each sample immediately when moving to it

});