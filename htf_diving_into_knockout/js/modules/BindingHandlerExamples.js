define([
    "knockout",
    "sample",
    "jquery",
    "jquery-ui",
    "../ko.extensions",
    "ext/Markdown.Converter"
],
function(ko, Sample, $) {

    return new Sample("Custom Binding Handlers", "BindingHandlerExamples", [
        new Sample.State("The Interface","01_api", {hideResult: true}),

        //TODO: show html with value: a, valueUpdate: 'afterkeydown'
        //NOTE: first time you did this, you forgot to show this earlier in the talk...
        new Sample.State("Augment Existing Handlers","02_dynamicValue", { hideResult: false, hideHtml: false}),
        new Sample.State("Augment Existing Handlers","03_dynamicValue", { hideResult: false, hideHtml: false}),

        new Sample.State("Augment Existing Handlers","03_hidden", { hideResult: false, hideHtml: false}),

        //TODO: maybe sneak in some other "convenience" bindings in here already typed out just to show
        //TODO: what you can do

        new Sample.State("Common UI Formatting","08_currency_01", { hideResult: false, hideHtml: true}),
        new Sample.State("Common UI Formatting","08_currency", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),
        new Sample.State("Common UI Formatting","09_currency", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),

        new Sample.State("Useful Helpers","10_toJSON", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),
        new Sample.State("Useful Helpers","11_toJSON", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),

        new Sample.State("Formatting Dates","12_date", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),
        new Sample.State("Formatting Dates","13_date", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),

        new Sample.State("Existing Libraries/Plugins","06_progressBar", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),
        new Sample.State("Existing Libraries/Plugins","07_progressBar", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),

        new Sample.State("Existing Libraries/Plugins","14_markdown", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),
        new Sample.State("Existing Libraries/Plugins","15_markdown", { hideResult: true, hideHtml: true, noHtmlNeeded: false }),

        //TODO: do we need? if so, create an HTML beginning/start for it.
//        new Sample.State("Existing Libraries/Plugins","16_autocomplete", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
//        new Sample.State("Existing Libraries/Plugins","17_autocomplete", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),


        new Sample.State("Widgets", "06_widgets_01", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
        new Sample.State("Widgets", "06_widgets_02", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
        new Sample.State("Widgets", "06_widgets_03", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
        new Sample.State("Widgets", "06_widgets_stopbinding_04", { hideResult: true, hideHtml: true, noHtmlNeeded: true }),
        new Sample.State("Widgets", "06_widgets_05", { hideResult: false, hideHtml: false, noHtmlNeeded: false}),



        new Sample.State("More Complex Widgets","04_clickToEdit_01", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
        new Sample.State("More Complex Widgets","04_clickToEdit", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),
        new Sample.State("More Complex Widgets","05_clickToEdit", { hideResult: false, hideHtml: false, noHtmlNeeded: false }),






//        new Sample.State("Utilize Existing Handlers","dynamicValue"),
//        new Sample.State("Utilize Existing Handlers","hidden"),
//        new Sample.State("Create and Handle Child nodes","clickToEdit"),
//        new Sample.State("Utilize other plugins / libraries easily","progressbar"),


    ], true);  //this last true tells it to load each sample immediately when moving to it

});