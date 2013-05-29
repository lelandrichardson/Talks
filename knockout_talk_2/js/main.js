require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        "knockout": "ext/knockout-2.1.0",
        "jquery": "ext/jquery-1.7.2.min",
        "jquery-ui": "ext/jquery-ui.min",
        "text": "ext/text",
        "codemirror": "ext/codemirror",
        "bootstrap": "ext/bootstrap.min",
        "extensions": "../ko.extensions"
    },
    shim: {
        "bootstrap": ["jquery"]
    }
});

require([
    "knockout",
    "app",
    "jquery",
    "bootstrap",
    "utilities",
    "stringTemplateEngine",
    "text",
    "codemirror",
],
function(ko, App, $) {
    var vm = new App();

    //simple client-side routing - update hash when current section is changed
    vm.currentSection.subscribe(function(newValue) {
        location.hash = newValue.name;
    });

    var updateSection = function() {
        vm.updateSection(location.hash.substr(1));
    };

    //respond to hashchange event
    window.onhashchange = updateSection;

    //initialize
    updateSection();

    //block alt navigation
    $(document).keydown(function(event) {
        if (event.altKey && (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40)) {
            return false;
        }
    });

    window.alert = function(textOrObject) {
        var inner;
        if(typeof textOrObject === "string"){
            inner = $("<div>").append($("<p>").text(textOrObject)).html();
        } else {
            inner = $("<div>").append($("<pre>").text(ko.toJSON(textOrObject,null,2))).html();
        }
        $("#alert .modal-body").html(inner).parent().modal();
    };


    //EXPOSE GLOBALS:
    window.extend = $.extend,
    window.each = $.each;
    window.POST_OPTIONS = {
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        processData: false,
        type: 'POST'
    };
    window.extend(window,{
        AJAX: $.ajax,
        GET_OPTIONS: extend(POST_OPTIONS,{type:'GET'}),
        PUT_OPTIONS: extend(POST_OPTIONS,{type:'PUT'}),
        DELETE_OPTIONS: extend(POST_OPTIONS,{type:'DELETE'}),
        POST: function(cfg){
            return AJAX(extend(POST_OPTIONS,cfg));
        },
        GET: function(cfg){
            return AJAX(extend(GET_OPTIONS,cfg));
        },
        PUT: function(cfg){
            return AJAX(extend(PUT_OPTIONS,cfg));
        },
        DELETE: function(cfg){
            return AJAX(extend(DELETE_OPTIONS,cfg));
        }
    });



    ko.applyBindings(vm);
});
