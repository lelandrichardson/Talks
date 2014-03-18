define([
    "knockout",
    "sample",
    "../ko.extensions"
], function(ko, Sample) {

    return new Sample("Structure & Patterns", "PatternExamples", [
        new Sample.State("Plain Old JS Objects (POJOs)","01_pojo_01", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Plain Old JS Objects (POJOs)","01_pojo_02", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Object Factories","02_object_factory_01", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Object Extenders","03_object_extender_01", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Constructor Pattern","04_ctor_01", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Constructor Pattern (with `.populate()`)","04_ctor_02", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Managing Collections", "05_collections_01", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing Collections: Mapping Data", "05_collections_02", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing Collections: Mapping Data", "05_collections_03", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing Collections: Mapping Data", "05_collections_04", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing Collections: Mapping Data", "05_collections_05", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing Collections: Array<type>", "05_collections_06", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing Collections: Array<type> via extension", "05_collections_07", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing Collections: conventional mapping", "05_collections_08", { hideResult: true, hideHtml: true}),

//        new Sample.State("Widgets", "06_widgets_01", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
//        new Sample.State("Widgets", "06_widgets_02", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
//        new Sample.State("Widgets", "06_widgets_03", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
//        new Sample.State("Widgets", "06_widgets_stopbinding_04", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
//        new Sample.State("Widgets", "06_widgets_05", { hideResult: false, hideHtml: false, noHtmlNeeded: false}),


    ], true);  //this last true tells it to load each sample immediately when moving to it

});