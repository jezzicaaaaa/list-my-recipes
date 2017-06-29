$(document).ready(function(){
// var url = 'http://food2fork.com/api/search?';
// var apiKey = 'key=882f2168d0e0186c5f6ffdbd0e93b5e1&q=';

var recipes = [];
    $("form").on("submit", function(e){
        e.preventDefault();
        var ingredients = $('.ingredients').val();

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search",
            dataType: "json",
            data: {
                key: "882f2168d0e0186c5f6ffdbd0e93b5e1",
                q: ingredients
            },
        })
        .done(function(data){
            recipes = data.recipes;
            listMyRecipe(recipes);
        });

    });

    //Make a template to append results to//
    var template = `
    <div class = "lists">
    
    
    
    
    `;

    //Create a loop to run results and put it in an array
    function listMyRecipe(recipeList){
        for ( i= 0; i < recipeList.length; i++ ){
            var mylists = recipeList[i];   
    var template = `
    <div class = "lists">
    <h2> ${mylists.title}</h2>
    <img src =" ${mylists.image_url} ">
    </div> 
    `;            
            console.log(mylists);   
            $('.results').append(template);
    }
        }
});