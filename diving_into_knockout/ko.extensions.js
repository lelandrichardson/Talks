// BINDING HANDLERS (no dependencies)
// ---------------------------------------------------------------------
;(function(ko){
    var extend = ko.utils.extend;

    // clickToEdit
    ko.bindingHandlers.clickToEdit = {
        init: function(element, valueAccessor) {
            var observable = valueAccessor(),
                link = document.createElement("a"),
                input = document.createElement("input");
            element.appendChild(link);
            element.appendChild(input);

            observable.editing = ko.observable(false);

            ko.applyBindingsToNode(link, {
                text: observable,
                hidden: observable.editing,
                click: function() { observable.editing(true); }
            });

            ko.applyBindingsToNode(input, {
                value: observable,
                visible: observable.editing,
                hasfocus: observable.editing
            });

        }
    };

    // stopBinding
    ko.bindingHandlers.stopBinding = {
        init: function () {
            return { controlsDescendantBindings: true };
        }
    };
    ko.virtualElements.allowedBindings.stopBinding = true;

    // dynamicValue
    ko.bindingHandlers.dynamicValue = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            ko.bindingHandlers.value.init(element,valueAccessor,
                ko.observable(extend(allBindingsAccessor(),{valueUpdate: 'afterkeydown'}))
            );
        },
        update: ko.bindingHandlers.value.update
    }

    // hidden
    ko.bindingHandlers.hidden = {
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            ko.bindingHandlers.visible.update(element, function () { return !value; });
        }
    };

    // hasFocus
    ko.bindingHandlers.hasFocus = {
        init: function (element, valueAccessor) {
            $(element).focus(function () {
                var value = valueAccessor();
                value(true);
            });
            $(element).blur(function () {
                var value = valueAccessor();
                value(false);
            });
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            if (ko.utils.unwrapObservable(value))
                element.focus();
            else
                element.blur();
        }
    };

    // key event handlers
    var keyBinderFactory = function(keyCode){
        return {
            init: function(event, valueAccesor, allBindings, data) {
                var newValueAccessor = function() {
                    return {
                        keyup: function(data, event) {
                            if(event.keyCode === keyCode) {
                                valueAccessor().call(data, data, event);
                            }
                        }
                    };
                };
                ko.bindingHandlers.event.init(element,newValueAccessor,allBindings,data);
            }
        };
    };
    extend(ko.bindingHandlers,{
        enterKey: keyBinderFactory(13),
        escapeKey: keyBinderFactory(27),
        tabKey: keyBinderFactory(9),
        leftArrowKey: keyBinderFactory(37),
        rightArrowKey: keyBinderFactory(39),
        upArrowKey: keyBinderFactory(38),
        downArrowKey: keyBinderFactory(40)
    });


}(window.ko));


// FUNDAMENTAL OBJECTS (no dependencies)
// ---------------------------------------------------------------------
;(function(ko){
    var unwrap = ko.utils.unwrapObservable,
        extend = ko.utils.extend,
        forEach = ko.utils.objectForEach;

    // MODEL EDITOR
    // ----------------------------------------------------------------
    ko.modelEditor = function(Ctor){
        extend(Ctor.prototype,ko.modelEditor.prototype);
        return Ctor;
    };
    extend(ko.modelEditor.prototype,{
        revert: function(){
            console.log("revert");
            this.applyModel(this.cache.clean);
        },
        commit: function() {
            console.log("commit");
            this.cache.clean = ko.toJS(this);
        },
        initialize: function(model){
            this.cache = extend(function(){},{
                clean: model
            });

            this.applyModel(model);
        },
        applyModel: function(model){
            var vm = this;
            for(var key in model){
                if(model.hasOwnProperty(key) && vm.hasOwnProperty(key)){
                    if(ko.isObservable(vm[key]) || ko.isComputed(vm[key])){
                        vm[key](model[key]);
                    } else {
                        vm[key] = model[key];
                    }
                }
            };
        }
    });

    // DIRTY FLAGS (http://jsfiddle.net/rniemeyer/dtpfv/)
    // ----------------------------------------------------------------
    ko.dirtyFlag = function (root, isInitiallyDirty) {
        var result = function () { },
            _initialState = ko.observable(ko.toJS(root)),
            _isInitiallyDirty = ko.observable(isInitiallyDirty);

        result.isDirty = ko.computed(function () {
            return _isInitiallyDirty() || ko.toJSON(_initialState()) !== ko.toJSON(root);
        });

        result.dirtyItems = ko.computed(function() {
            var currentState = ko.toJS(root);
            var initialState = _initialState();
            var returnValue = { };
            for (var i in initialState) {
                if (currentState[i] !== initialState[i]) {
                    returnValue[i] = currentState[i];
                }
            }
            return returnValue;
        });

        result.reset = function () {
            _initialState(ko.toJS(root));
            _isInitiallyDirty(false);
        };

        result.resetToInitial = function () {
            var currentState = ko.toJS(root);
            var initialState = _initialState();
            var returnValue = {};
            for (var i in initialState) {
                if (currentState[i] !== initialState[i]) {
                    //note this is assuming root is an observable
                    root[i](initialState[i]);
                }
            }
        };
        return result;
    };

    // NUMERIC OBSERVABLE
    // ----------------------------------------------------------------
    ko.numericObservable = function (initialValue) {
        var _actual = ko.observable(initialValue);

        var result = ko.computed({
            read: function () {
                return _actual();
            },
            write: function (newValue) {
                var parsedValue = parseFloat(newValue);
                _actual(isNaN(parsedValue) ? newValue : parsedValue);
            }
        });

        return result;
    };

    // PROTECTED OBSERVABLE
    // ----------------------------------------------------------------
    ko.protectedObservable = function (initialValue) {
        //private variables
        var _actualValue = ko.observable(initialValue),
            _tempValue = initialValue;

        //computed observable that we will return
        var result = ko.computed({
            //always return the actual value
            read: function () {
                return _actualValue();
            },
            //stored in a temporary spot until commit
            write: function (newValue) {
                _tempValue = newValue;
            }
        });

        //if different, commit temp value
        result.commit = function () {
            if (_tempValue !== _actualValue()) {
                _actualValue(_tempValue);
            }
        };

        //force subscribers to take original
        result.reset = function () {
            _actualValue.valueHasMutated();
            _tempValue = _actualValue();   //reset temp value
        };

        return result;
    };

}(window.ko));


// EXTENSIONS (no dependencies)
// ---------------------------------------------------------------------
;(function(ko){
    var unwrap = ko.utils.unwrapObservable,
        extend = ko.utils.extend,
        forEach = ko.utils.objectForEach;


}(window.ko));