define([
    "knockout",
    "sample",
    "../ko.extensions"
], function(ko, Sample) {

    return new Sample("Application Structure & Patterns", "PatternExamples", [
        new Sample.State("Plain Old JS Objects (POJOs)","01_pojo", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Plain Old JS Objects (POJOs)","02_pojo", { hideResult: false, hideHtml: true, noHtmlNeeded: false }),
        new Sample.State("Plain Old JS Objects (POJOs)","03_pojo", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Managing 'this'", "04_managing_this", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing 'this'", "05_managing_this", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Managing 'this'", "06_managing_this", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Widgets", "07_widgets", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
        new Sample.State("Widgets", "08_widgets", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
        new Sample.State("Widgets", "09_widgets", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),

        new Sample.State("Widgets", "09_widgets_stopbinding", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Widgets", "10_widgets", { hideResult: false, hideHtml: false, noHtmlNeeded: false}),

//        new Sample.State("Plain Old JS Objects (POJOs)","pojo", { hideResult: true, hideHtml: true }),
//        new Sample.State("Constructor/Object Pattern","constructor", { hideResult: true, hideHtml: true }),
//        new Sample.State("ViewModel Inheritance","inheritance", { hideResult: true, hideHtml: true }),
//        new Sample.State("Managing 'this'", "this", { hideResult: true, hideHtml: true }),
//        new Sample.State("Compound ViewModels", "compound", { hideResult: true, hideHtml: true }),
//        new Sample.State("Widgets", "widgets", { hideResult: true, hideHtml: true })
    ], true);  //this last true tells it to load each sample immediately when moving to it

});