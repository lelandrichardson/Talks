var mainApp = {
    title: "This is the application",
    description: "I haz lotz of code"
};
ko.applyBindings(mainApp, document.getElementById("mainApp"));

// .......

var myWidget = {
    beAwesome: function() {
        alert("Sorry. You are not awesome :(");
    }
};
ko.applyBindings(myWidget, document.getElementById("myWidget"));