var extend = $.extend,
    unwrap = ko.utils.unwrapObservable,
    AJAX = $.ajax,
    POST_OPTIONS = {
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        processData: false,
        type: 'POST'
    },
    GET_OPTIONS = extend(POST_OPTIONS,{type:'GET'}),
    PUT_OPTIONS = extend(POST_OPTIONS,{type:'PUT'}),
    DELETE_OPTIONS = extend(POST_OPTIONS,{type:'DELETE'}),
    POST = function(cfg){
        return AJAX(extend(POST_OPTIONS,cfg));
    },
    GET = function(cfg){
        return AJAX(extend(GET_OPTIONS,cfg));
    },
    PUT = function(cfg){
        return AJAX(extend(PUT_OPTIONS,cfg));
    },
    DELETE = function(cfg){
        return AJAX(extend(DELETE_OPTIONS,cfg));
    };

ko.fromJS = function(model, data){
    var key;
    for(key in data)(function(key, fromServer, onModel){
        if(onModel !== undefined){
            if(ko.isObservable(onModel)){
                model[key](fromServer);
            } else {
                model[key] = fromServer;
            }
        }
    }(key, data[key], model[key]));
};


var Cocktail = function(){
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    self.rating = ko.observable();
    self.ingredients = ko.observableArray();

    self.save = function(){
        var exists = !!self.id();
        if(exists){
            POST({
                url: '/cocktail/' + self.id(),
                data: ko.toJS(self),
                success: function(response){
                    console.log("saved successfully!");
                }
            });
        } else {
            PUT({
                url: '/cocktail/' + (exists ? self.id() : ''),
                data: ko.toJS(self),
                success: function(data){
                    self.id(data.id);
                    console.log("created successfully!");
                }
            });
        }
    };

    self.load = function(){
        GET({
            url: '/cocktail/' + self.id(),
            success: function(data){
                self.id(data.id);
                self.name(data.name);
                self.rating(data.rating);
                self.ingredients(data.ingredients);
                console.log("loaded from server!");
            }
        });
    };
};

// or you could use the prototype instead...

var Cocktail = function(){
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    self.rating = ko.observable();
    self.ingredients = ko.observableArray();
};

extend(Cocktail.prototype,{
    load: function(){
        GET({
            url: '/cocktail/' + self.id(),
            success: function(data){
                self.name(data.name);
                self.rating(data.rating);
                self.ingredients(data.ingredients);
                console.log("loaded from server!");
            }
        });
    },
    save: function(){
        POST({
            url: '/cocktail/' + self.id(),
            data: ko.toJS(self),
            success: function(response){
                console.log("saved successfully!");
            }
        });
    }
});



restify(Cocktail, 'cocktail');










var restify = function(Ctor, resource, config){

    var serialize = config.serialize || ko.toJS;
    var deserialize = config.deserialize || ko.fromJS;
    extend(Ctor,{
        get: function(id, callback){
            //create new viewModel
            var model = new Ctor();
            GET({
                url: '/' + resource + '/' + id,
                success: function(data){
                    //load data into viewModel
                    deserialize(model,data);
                    //callback with newly instantiated viewModel
                    callback || callback(model);
                }
            });
            return model;
        },
        create: function(callback){
            //create new viewModel
            var model = new Ctor();
            PUT({
                url: '/' + resource,
                success: function(data){
                    //load data into viewModel
                    deserialize(model,data);
                    //callback with newly instantiated viewModel
                    callback || callback(model);
                }
            });
            return model;
        },
        update: function($instance, callback){
            POST({
                url: '/' + resource,
                data: serialize($instance),
                success: function(data){
                    //load data into viewModel
                    deserialize($instance,data);
                    //callback with newly instantiated viewModel
                    callback || callback(data);
                }
            });
        },
        remove: function(id, callback){
            DELETE({
                url: '/' + resource + '/' + id,
                success: function(data){
                    //callback with response
                    callback || callback(data);
                }
            });
        }
    });


    extend(Ctor.prototype,{
        load: function(success, error){
            var self = this;
            GET({
                url: '/' + resource + '/' + unwrap(self.id),
                success: function(data){
                    //load data into viewModel
                    deserialize(self,data);
                    //callback with newly instantiated viewModel
                    success || success(data);
                },
                error: error
            });
        },
        create: function(success, error){
            var self = this;
            PUT({
                url: '/' + resource,
                success: function(data){
                    //load data into viewModel
                    deserialize(self,data);
                    //callback with newly instantiated viewModel
                    success || success(data);
                },
                error: error
            });
        },
        save: function(success, error){
            var self = this;
            POST({
                url: '/' + resource + '/' + unwrap(self.id),
                success: function(data){
                    //load data into viewModel
                    deserialize(self,data);
                    //callback with newly instantiated viewModel
                    success || success(data);
                },
                error: error
            });
        },
        delete: function(success, error){
            var self = this;
            DELETE({
                url: '/' + resource + '/' + unwrap(self.id),
                success: success,
                error: error
            });
        }
    });

    return Ctor;
};