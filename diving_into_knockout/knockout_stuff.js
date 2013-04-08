
var initializable = function() {
    return {
        initiialize: function(model){
            var vm = this;
            for(var key in model){
                if(model.hasOwnProperty(key) && vm.hasOwnProperty(key)){
                    if(ko.isObservable(vm[key]) || ko.isComputed(vm[key])){
                        vm[key](model[key]);
                    } else {
                        vm[key] = model[key];
                    }
                }
            }
        }
    };
};
var entity = function(resourceUri) {
    var self = {};
    _.extend(self,
        initializable(), // inherits "initializable"
        {
            create: function() {
                var entity = this,
                    payload = ko.toJSON(this);
                app.put({
                    url: resourceUri,
                    data: payload,
                    success: function(data) {
                        entity.initialize(data);
                    }
                });
            },
            update: function() {
                var entity = this,
                    payload = ko.toJSON(this);
                app.post({
                    url: resourceUri + "/" + id,
                    data: payload,
                    success: function(data) {
                        entity.initialize(data);
                    }
                })
            },
            load: function(id) {
                var entity = this;
                app.get({
                    url: resourceUri + "/" + id,
                    success: function(data) {
                        entity.initialize(data);
                    }
                })
            },
            remove: function(callback){
                var entity = this,
                    payload = ko.toJSON(this);
                app.delete({
                    uri: resourceUri + "/" + id,
                    success: callback || function(){}
                })
            }
        }
    );
    return self;
};

var student = function(spec){
    var self = {};
    _.extend(self,
        entity('/student'), // inherits "entity"
        initializable() // inherits "initializable"
    );

    self.first = ko.observable();
    self.last = ko.observable();

    return self;
};





function EntityBase(spec) {
    this.__entity = function(){};
    this.__entity().resourceUri = spec.resourceUri;
};
_.extend(EntityBase.prototype,{
    save: function() {
        var entity = this,
            uri = entity.resourceUri;
        $.post()
    },
    update: function() {

    },
    load: function() {

    },
    remove: function(){

    }
});

function Student(spec){
    this.first = ko.observable();
    this.last = ko.observable();
};
_.extend(Student.prototype,{
    fullName: ko.computed(function(){
        this.first()
    })
});