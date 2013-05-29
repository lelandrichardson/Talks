define([
    "knockout",
    "sample",
    "jquery",
    "jquery-ui"
],
function(ko, Sample, $) {

    return new Sample("Custom Binding Handlers", "BindingHandlerExamples", [
        new Sample.State("API","01_api", {hideResult: true}),

        //TODO: show html with value: a, valueUpdate: 'afterkeydown'
        new Sample.State("Augment Existing Handlers","02_dynamicValue", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Augment Existing Handlers","03_dynamicValue", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),


        //TODO: maybe sneak in some other "convenience" bindings in here already typed out just to show
        //TODO: what you can do

        //TODO: start off with a viewModel with computed...
        //TODO: talk about how this is more the view's job, not the view model's
        new Sample.State("Common UI Formatting","08_currency", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Common UI Formatting","09_currency", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Useful Helpers","10_toJSON", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Useful Helpers","11_toJSON", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Existing Libraries/Plugins","12_date", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Existing Libraries/Plugins","13_date", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Existing Libraries/Plugins","06_progressBar", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Existing Libraries/Plugins","07_progressBar", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Existing Libraries/Plugins","14_markdown", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Existing Libraries/Plugins","15_markdown", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        new Sample.State("Existing Libraries/Plugins","16_autocomplete", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Existing Libraries/Plugins","17_autocomplete", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),

        //TODO: start out with the full HTML markup of this viewmodel
        new Sample.State("More Complex Widgets","04_clickToEdit", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("More Complex Widgets","05_clickToEdit", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),



        new Sample.State("Utilize Existing Handlers","dynamicValue"),
        new Sample.State("Utilize Existing Handlers","hidden"),
        new Sample.State("Create and Handle Child nodes","clickToEdit"),
        new Sample.State("Utilize other plugins / libraries easily","progressbar"),


    ], true);  //this last true tells it to load each sample immediately when moving to it

});