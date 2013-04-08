define(["knockout", "sample"], function(ko, Sample) {

    return new Sample("Working with the Server", "WorkingWithServer", [
        new Sample.State("Loading Data via Ajax","ajax", { hideResult: true, hideHtml: true }),
        new Sample.State("Mapping with ko.toJSON & ko.toJS","mapping", { hideResult: true, hideHtml: true })
    ], true);  //this last true tells it to load each sample immediately when moving to it

});