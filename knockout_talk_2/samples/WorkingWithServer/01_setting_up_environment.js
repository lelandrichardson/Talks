var extend = $.extend,
    unwrap = ko.utils.unwrapObservable,
    AJAX = function(cfg) {
        return $.ajax(extend(cfg, {
            data: (cfg.dataType === 'json' && !cfg.processData) ? JSON.stringify(cfg.data) : cfg.data
        }));
    },
    POST_OPTIONS = {
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        processData: false,
        type: 'POST'
    },
    GET_OPTIONS = extend({},POST_OPTIONS, { type: 'GET' }),
    PUT_OPTIONS = extend({}, POST_OPTIONS, { type: 'PUT' }),
    DELETE_OPTIONS = extend({}, POST_OPTIONS, { type: 'DELETE' }),
    POST = function (cfg) {
        return AJAX(extend({}, POST_OPTIONS, cfg));
    },
    GET = function (cfg) {
        return AJAX(extend({}, GET_OPTIONS, cfg));
    },
    PUT = function (cfg) {
        return AJAX(extend({}, PUT_OPTIONS, cfg));
    },
    DELETE = function (cfg) {
        return AJAX(extend({}, DELETE_OPTIONS, cfg));
    };