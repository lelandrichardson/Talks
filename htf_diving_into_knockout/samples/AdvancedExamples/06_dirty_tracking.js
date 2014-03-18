// http://jsfiddle.net/rniemeyer/dtpfv/
ko.dirtyFlag = function (root, isInitiallyDirty) {
    var result = function () { },
        _initialState = ko.observable(ko.toJS(root)),
        _isInitiallyDirty = ko.observable(isInitiallyDirty);

    result.isDirty = ko.dependentObservable(function () {
        return _isInitiallyDirty() || ko.toJSON(_initialState()) !== ko.toJSON(root);
    });

    result.dirtyItems = ko.dependentObservable(function() {
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