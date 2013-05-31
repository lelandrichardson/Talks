var mainApp = {
    title: "This is the application",
    description: "I haz lotz of code"
};
ko.applyBindings(mainApp, document.getElementById("mainApp"));

// .......

var myWidget = {
    doStuff: function() {
        alert("I worked!");
    }
};
ko.applyBindings(myWidget, document.getElementById("myWidget"));