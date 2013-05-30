define(["knockout", "sample"], function(ko, Sample) {

    return new Sample("Working with the Server", "WorkingWithServer", [
        new Sample.State("Setting up the environment","01_setting_up_environment", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Basic AJAX","02_basic_ajax", { hideResult: true, hideHtml: true, noHtmlNeeded: true  }),
        new Sample.State("Basic AJAX","03_basic_ajax", { hideResult: true, hideHtml: true, noHtmlNeeded: true  }),
        new Sample.State("Using the Prototype","04_prototype_ajax", { hideResult: true, hideHtml: true, noHtmlNeeded: true  }),
        new Sample.State("Convention Based","07_convention_based", { hideResult: true, hideHtml: true, noHtmlNeeded: true  }),
        new Sample.State("Convention Based","08_convention_based_full", { hideResult: true, hideHtml: true, noHtmlNeeded: true  }),
        new Sample.State("Convention Based","09_convention_based", { hideResult: true, hideHtml: true, noHtmlNeeded: true  }),



//        new Sample.State("Loading Data via Ajax","ajax", { hideResult: true, hideHtml: true }),
//        new Sample.State("Mapping with ko.toJSON & ko.toJS","mapping", { hideResult: true, hideHtml: true })
    ], true);  //this last true tells it to load each sample immediately when moving to it

});