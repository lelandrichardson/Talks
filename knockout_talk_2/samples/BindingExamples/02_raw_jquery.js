var cocktail = {
    name: "Gin and Tonic",
    rating: 9.5
};
$("#display").text(cocktail.name);
$("#name").val(cocktail.name).change(function(){
    cocktail.name = this.value;
    $("#display").text(this.value);
});