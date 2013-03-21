var VOW = (function () {

    function enqueue(queue, func, resolver, breaker) {
        queue[queue.length] = typeof func !== 'function'
            ? resolver
            : function (value) {
            try {
                var result = func(value);
                if (result && result.is_promise === true) {
                    result.when(resolver, breaker);
                } else {
                    resolver(result);
                }
            } catch (e) {
                breaker(e);
            }
        };
    }

    function enlighten(queue, fate) {
        queue.forEach(function (func) {
            setImmediate(func, fate);
        });
    }

    return {
        make: function make() {
            var breakers = [], fate,
                keepers = [], status = 'pending';

            function herald(state, value, queue) {
                if (status !== 'pending') {
                    throw "overpromise";
                }
                fate = value;
                status = state;
                enlighten(queue, fate);
                keepers.length = 0;
                breakers.length = 0;
            }

            return {
                break: function (reason) {
                    herald('broken', reason, breakers);
                },
                keep: function (value) {
                    herald('kept', value, keepers);
                },
                promise: {
                    is_promise: true,
                    when: function (kept, broken) {
                        var vow = make();
                        switch (status) {
                            case 'pending':
                                enqueue(keepers, kept, vow.keep, vow.break);
                                enqueue(breakers, broken, vow.break, vow.break);
                                break;
                            case 'kept':
                                enqueue(keepers, kept, vow.keep, vow.break);
                                enlighten(keepers, fate);
                                break;
                            case 'broken':
                                enqueue(keepers, broken, vow.break, vow.break);
                                enlighten(breakers, fate);
                                break;
                        }
                        return vow.promise;
                    }
                }
            };
        }
    };
})();