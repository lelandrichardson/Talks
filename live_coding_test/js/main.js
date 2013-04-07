require.config({
    paths: {
        "knockout": "ext/knockout-2.1.0",
        "jquery": "ext/jquery-1.7.2.min",
        "text": "ext/text",
        "codemirror": "ext/codemirror",
        "bootstrap": "ext/bootstrap.min"
    },
    shim: {
        "bootstrap": ["jquery"]
    }
});

require([
    "knockout",
    "app",
    "jquery",
    "sample",
    "bootstrap",
    "utilities",
    "stringTemplateEngine",
    "text",
    "codemirror"],
function(ko, App, $, Sample) {
    var vm = new App();

    var sample = new Sample("Code Sample One", "one", [
        new Sample.State("Some code","code"),
        new Sample.State("Hide output","no-output", { hideResult: true }),
        new Sample.State("Hide output and HTML", "just-js", { hideResult: true, hideHtml: true }),
        new Sample.State("Load some JS/HTML not as code sample", "not-sample", { loadAsSection: true }),
        new Sample.State("More code", "more"),
        new Sample.State("More code", "more2")
    ], true);

    ko.applyBindings(sample);
});
