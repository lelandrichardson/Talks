define(["knockout", "sample"], function(ko, Sample) {

    return new Sample("Application Structure & Patterns", "PatternExamples", [
        new Sample.State("Plain Old JS Objects (POJOs)","pojo", { hideResult: true, hideHtml: true }),
        new Sample.State("Constructor/Object Pattern","constructor", { hideResult: true, hideHtml: true }),
        new Sample.State("ViewModel Inheritance","inheritance", { hideResult: true, hideHtml: true }),
        new Sample.State("Managing 'this'", "this", { hideResult: true, hideHtml: true }),
        new Sample.State("Compound ViewModels", "compound", { hideResult: true, hideHtml: true }),
        new Sample.State("Widgets", "widgets", { hideResult: true, hideHtml: true })
    ], true);  //this last true tells it to load each sample immediately when moving to it

});