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

    var sample = new Sample("Code Sample One", "one", [
        new Sample.State("Some code","code")
    ], true);

    ko.applyBindings(sample);
});
