define(["knockout"],
function(ko) {
    return function(spec) {
        var self = this;
        this.static = spec.static || false;
        this.name = spec.name;
        this.template = spec.template || spec.name;
        this.data = ko.observable();
        this.style = spec.style;
        this.loaded = false;
        this.activate = function() {
            //load view model from the server
            var deps = ["text!../templates/" + self.template + ".html"];
            if(!self.static) {
                deps.push("modules/" + spec.name);
            }
            if (!this.loaded) {
                require(deps, function(template, Module) {
                    ko.templates[self.template] = template;
                    self.data(self.static ? true : typeof Module === "function" ? new Module() : Module);
                    self.loaded = true;
                });
            }
        };
    };
});
