var restify = function(Ctor, resource, config){

    var serialize = config.serialize || ko.toJS;
    var deserialize = config.deserialize || ko.fromJS;

    extend(Ctor,{
        get: function(id, callback){/*...*/},
        create: function(callback){/*...*/},
        update: function($instance, callback){/*...*/},
        remove: function(id, callback){/*...*/}
    });

    extend(Ctor.prototype,{
        load: function(success, error){/*...*/},
        create: function(success, error){/*...*/},
        save: function(success, error){/*...*/},
        delete: function(success, error){/*...*/}
    });

    return Ctor;
};