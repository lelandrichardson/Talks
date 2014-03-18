;(function(ko){

    // hidden
    ko.bindingHandlers.hidden = {
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            ko.bindingHandlers.visible.update(element, function () { return !value; });
        }
    };

    (function(){
        var factory = function(config){
            ko.bindingHandlers[config.binding] = {
                update: function (element, valueAccessor, allBindingsAccessor) {
                    ko.bindingHandlers.attr.update(element,function(){var r = {}; r[config.attr] = valueAccessor();return r;},allBindingsAccessor);
                }
            };
        };
        var attributes = [
            {attr: "href", binding: "href"},
            {attr: "src", binding: "src"},
            {attr: "title", binding: "title" }
        ];
        for(var i = 0; i < attributes.length; i++){
            factory(attributes[i]);
        }
    })();

    var classesWrittenByBindingKey = '__ko__cssValue';
    ko.bindingHandlers['css'] = {
        'update': function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            //this needs to be called first since an array will pass the typeof -> "object" test
            if(Object.prototype.toString.call(value) === '[object Array]'){
                value = value.join(' '); // if array, assume they are passing array of string class names to apply.
            }

            if (typeof value == "object") {
                ko.utils.objectForEach(value, function(className, shouldHaveClass) {
                    shouldHaveClass = ko.utils.unwrapObservable(shouldHaveClass);
                    ko.utils.toggleDomNodeCssClass(element, className, shouldHaveClass);
                });
            } else {
                value = String(value || ''); // Make sure we don't try to store or set a non-string value
                ko.utils.toggleDomNodeCssClass(element, element[classesWrittenByBindingKey], false);
                element[classesWrittenByBindingKey] = value;
                ko.utils.toggleDomNodeCssClass(element, value, true);
            }
        }
    };




    ko.bindingHandlers.href = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            ko.bindingHandlers.attr.update(element,function(){return {href: valueAccessor()}},allBindingsAccessor);
        }
    };


}(window.ko))