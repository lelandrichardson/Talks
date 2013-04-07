(function(ko,Markdown){

    ko.bindingHandlers.markdown = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var converter = new Markdown.Converter(),
                suffix,
                a = element.id,
                b = "wmd-input";

            if(a !== b){
                suffix = a.substring(a.indexOf(b) + b.length);
            }
            var editor = new Markdown.Editor(converter,suffix);
            valueAccessor().__editor = editor;
            converter.hooks.chain("preConversion",function(text){
                valueAccessor()(text);
                return text;
            });

            editor.run();
            ko.bindingHandlers.value.init(element,valueAccessor, allBindingsAccessor,viewModel,bindingContext);
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.value.update(element,valueAccessor, allBindingsAccessor,viewModel,bindingContext);
            valueAccessor().__editor.refreshPreview();
        }
    };

    ko.subscribable.fn.markdown = function(options){
        var target = this,
            options = options || {},
            sanitize = options.sanitize && true,
            converter = sanitize ? Markdown.getSanitizingConverter() : new Markdown.Converter();

        target.html = ko.observable();

        var update = function(newValue){
            target.html(converter.makeHtml(newValue));
        };

        var htmlTimeout;
        target.subscribe(function(newValue){
            clearTimeout(htmlTimeout);
            htmlTimeout = setTimeout(update.bind(null,newValue),+options.throttle);
        });

        return target;
    };

}(window.ko,window.Markdown));
