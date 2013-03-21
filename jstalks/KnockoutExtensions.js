(function (ko, $) {

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

    ko.bindingHandlers.stopBinding = {
        init: function () {
            return { controlsDescendantBindings: true };
        }
    };
    ko.virtualElements.allowedBindings.stopBinding = true;

    $.fn.flash = function (highlightColor, duration) {
        var highlightBg = highlightColor || "#FFFF9C";
        var animateMs = duration || 1500;
        var originalBg = this.css("backgroundColor");
        this.stop().css("background-color", highlightBg).animate({ backgroundColor: originalBg }, animateMs);
    };

    ko.bindingHandlers.flash = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            ko.utils.unwrapObservable(valueAccessor());
            $(element).flash(null, 1500);
        }
    };

    ko.bindingHandlers.scrollTo = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var binding = valueAccessor();
            var $element = $(element);
            ko.utils.unwrapObservable(binding.trigger());
            if (binding.onlyIfHidden && $element.is(":visible"))
            {
                return;
            }
            $(binding.container || "html, body").animate({scrollTop: ($element.offset().top) + 'px'});
        }
    };

    //connect items with observableArrays
    ko.bindingHandlers.sortableList = {
        init: function (element, valueAccessor) {
            var list = valueAccessor();
            var oldPosition = -1;
            $(element).sortable({
                start: function (event, ui) {
                    //save the initial position for object retrieval later
                    oldPosition = ui.item.index();
                },
                update: function (event, ui) {
                    //retrieve our actual data item
                    //note what this old code returned was not the object we wanted.
                    //var item = ui.item.tmplItem().data;
                    var item = list()[oldPosition];
                    //figure out its new position
                    var position = ui.item.index();//ko.utils.arrayIndexOf(ui.item.parent().children(), ui.item[0]);
                    //remove the item and add it back in the right spot
                    if (position >= 0) {
                        list.remove(item);
                        list.splice(position, 0, item);
                    }
                    ui.item.remove();
                }//,
                //note this was just for debugging. Hard to inspect an element while also dragging
                //change: function (event, ui) {
                //}
            });
        }
    };

    // template binding which clears all children before binding...
    ko.bindingHandlers.templateWithClear = {
        init: function (element, valueAccessor) {
            $(element).children().remove();
            return ko.bindingHandlers.template.init(element, valueAccessor);
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            return ko.bindingHandlers.template.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        }
    };

    ko.bindingHandlers.slideVisible = {
        update: function(element, valueAccessor, allBindingsAccessor) {
            // First get the latest data that we're bound to
            var value = valueAccessor(), allBindings = allBindingsAccessor();

            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);

            // Grab some more data from another binding property
            var duration = allBindings.slideDuration || 400; // 400ms is default duration unless otherwise specified

            // Now manipulate the DOM element
            if (valueUnwrapped == true)
                $(element).slideDown(duration); // Make the element visible
            else
                $(element).slideUp(duration);   // Make the element invisible
        }
    };

    //wrapper to an observable that requires accept/cancel
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

    ko.observable.fn.editable = function() {
        var self = this;
        self.editValue = ko.observable(self());
        self.accept = function() {
            self(self.editValue());
        };
        return self;
    };

    // http://jsfiddle.net/rniemeyer/dtpfv/
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

    ko.extenders.numeric = function (target, precision) {
        //create a writeable computed observable to intercept writes to our observable
        var result = ko.computed({
            read: target,  //always return the original observables value
            write: function (newValue) {
                var current = target(),
                    roundingMultiplier = Math.pow(10, precision),
                    newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
                    valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

                //only write if it changed
                if (valueToWrite !== current) {
                    target(valueToWrite);
                } else {
                    //if the rounded value is the same, but a different value was written, force a notification for the current field
                    if (newValue !== current) {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        });

        //initialize with current value to make sure it is rounded appropriately
        result(target());

        //return the new computed observable
        return result;
    };

    ko.extenders.maxChars = function(target, length) {
        var result = ko.computed({
            read: target,
            write: function (newValue) {
                if (newValue.length > length) {
                    var toWrite = newValue.substr(0, length);
                    target(toWrite);
                    target.notifySubscribers(toWrite);
                } else {
                    target(newValue);
                }
            }
        });

        result.lengthMessage = ko.computed(function() {
            return "( " + result().length + " / " + length + " )";
        });
        return result;
    };

    //note: relies on .toISOString
    ko.extenders.isoDate = function (target, formatString) {
        target.formatted = ko.computed({
            read: function () {
                if (!target()) {
                    return;
                }
                var dt = new Date(Date.parse(target()));
                return dt.format(formatString, true);
            },
            write: function (value) {
                if (value) {
                    target(new Date(Date.parse(value)).toISOString());
                }
            }
        });

        //initialize with current value
        target.formatted(target());

        //return the computed observable
        return target;
    };

})(ko, jQuery);