define(["knockout", "section"], function(ko, Section) {
    window.ko = ko;
    return function() {
        var self = this;

        this.sections = ko.observableArray([
            new Section({name: "Title", static: true}),

            new Section({name: "WhatIsKnockoutJs", template: "transition"}),
                new Section({name: "LibraryVsFramework", template: "points"}),
                new Section({name: "MVVM", template: "meme"}),
                new Section({name: "DeclarativeBindings", template: "meme"}),
                new Section({name: "ClassHierarchy", template: "meme"}),

            new Section({name: "HelloWorld", template: "meme"}),
                new Section({name: "BindingExamples", template: "sample"}),

            new Section({name: "ApplicationStructure", template: "meme"}),
                new Section({name: "PatternExamples", template: "sample"}),

            new Section({name: "CustomBindingHandlers", template: "points"}),
                new Section({name: "BindingHandlerExamples", template: "sample"}),

            new Section({name: "AdvancedUsage", template: "meme"}),
                new Section({name: "AdvancedExamples", template: "sample"}),

            new Section({name: "WorkingWithServer", template: "sample"}),




        ]);

        this.updateSection = function(name) {
            var newIndex, i, length, sections = self.sections();

            for (i = 0, length = sections.length; i < length; i++) {
                if (sections[i].name === name) {
                    newIndex = i;
                    break;
                }
            }

            self.index(newIndex === undefined ? 0 : newIndex);
        };

        this.index = ko.observable(0);
        this.currentSection = ko.computed(function() {
            var newSection = self.sections()[self.index()];
            newSection.activate();
            return newSection;
        });

        //go forward unless we are at the end
        this.goNext = function() {
            var index = self.index(),
                newIndex = (index === self.sections().length - 1) ? index : index + 1;

            location.hash = self.sections()[newIndex].name;
        };

        //go back unless we are at the beginning
        this.goPrevious = function() {
            var index = self.index(),
                newIndex = index ? index - 1 : index;

            location.hash = self.sections()[newIndex].name;
        };

        //if the current page has steps, then go forward
        this.stepNext = function() {
            var data = this.currentSection().data();
            if (data.next) {
                return data.next.call(data);
            }
        };

        //if the current page has steps, then go back
        this.stepPrevious = function() {
            var data = this.currentSection().data();
            if (data.previous) {
                return data.previous.call(data);
            }
        };
    };
});