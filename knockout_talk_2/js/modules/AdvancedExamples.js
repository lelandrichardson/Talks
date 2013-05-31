define([
    "knockout",
    "sample",
    "jquery",
    "jquery-ui",
    "../ko.extensions"
],
function(ko, Sample, $) {

    return new Sample("Extending Knockout", "AdvancedExamples", [




        new Sample.State("Restrict Values","02_matchpattern_01", { hideResult: false, hideHtml: false}),
        new Sample.State("Writeable Computed Observables","02_matchpattern_02", { hideResult: false, hideHtml: false}),
        new Sample.State("Building Observable Extensions","02_matchpattern_03", { hideResult: false, hideHtml: false}),

        new Sample.State("Building Observable Extensions","02_matchpattern_04", { hideResult: false, hideHtml: false}),

        new Sample.State("Numeric Input","03_numeric_01", { hideResult: false, hideHtml: true}),
        new Sample.State("Numeric Input","03_numeric_02", { hideResult: false, hideHtml: true}),

        new Sample.State("Writeable Computed Observables","01_numeric", {hideResult: true}),

        new Sample.State("Dirty Tracking","05_dirty_tracking_01", { hideResult: false, hideHtml: true}),
        new Sample.State("Dirty Tracking","05_dirty_tracking_02", { hideResult: false, hideHtml: true}),

        new Sample.State("Dirty Tracking","05_dirty_tracking_03", { hideResult: true, hideHtml: true, noHtmlNeeded: true}),
        new Sample.State("Dirty Tracking","05_dirty_tracking_04", { hideResult: false, hideHtml: true, noHtmlNeeded: false}),

//
//
//        new Sample.State("Utilize Existing Handlers","dynamicValue"),
//        new Sample.State("Utilize Existing Handlers","hidden"),
//        new Sample.State("Create and Handle Child nodes","clickToEdit"),
//        new Sample.State("Utilize other plugins / libraries easily","progressbar"),
//        new Sample.State("Computed Observables", "computed"),
//        new Sample.State("Observable Arrays", "arrays")
    ], true);  //this last true tells it to load each sample immediately when moving to it

});