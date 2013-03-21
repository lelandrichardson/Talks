var eventuality = function (that) {
    var registry = {};
    that.fire = function (event) {
        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ? event : event.type;

        if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for (i = 0; i < array.length; i += 1) {
                handler = array[i];
                func = handler.method;
                if (typeof func === 'string') {
                    func = this[func];
                }
                func.apply(this, [event]);
            }
        }
        return this;
    };
    that.on = function (type, method) {
        var handler = {
            method: method
        };
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };

    that.override = function(type, method) {
        if (registry.hasOwnProperty(type)) {
            registry[type].length = 0;
        }
        return that.on(type, method);
    };
    return that;
};