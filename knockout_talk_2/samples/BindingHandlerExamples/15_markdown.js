var converter = new Markdown.Converter();
ko.bindingHandlers.markdown = {
    update: function(element, valueAccessor) {
        return ko.bindingHandlers.html.update(element, function() {
            return converter.makeHtml(ko.unwrap(valueAccessor()));
        });
    }
};