require.config({
    paths: {
        "reveal": "reveal.min",
        "head": "lib/js/head.min",
        "knockout": "ext/knockout-2.2.1",
        "jquery": "ext/jquery.min",
        "text": "ext/text",
        "codemirror": "ext/codemirror",
        "bootstrap": "ext/bootstrap.min"
    },
    shim: {
        "bootstrap": ["jquery"],
        "reveal" : {
            exports: "Reveal"
        }
    }
});

require([
    "reveal",
    "knockout",
    "jquery",
    "sample",
    "bootstrap",
    "utilities",
    "stringTemplateEngine",
    "text",
    "codemirror"
],
function(Reveal, ko, $, Sample) {

    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
        transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

        // Optional libraries used to extend on reveal.js
        dependencies: [
            { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: 'plugin/markdown/showdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
            { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
            { src: 'plugin/live-coding/live-coding.js', async: true, condition: function() { return !!document.body.classList; } }

            // { src: 'plugin/search/search.js', async: true, condition: function() { return !!document.body.classList; } }
            // { src: 'plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }
        ]
    });

    var sample = new Sample("Code Sample One", "bindingRawObjects", [
        new Sample.State("Some code","code")
    ], true);

    ko.applyBindings(sample);

});


