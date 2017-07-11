$(document).ready(function(){

$('.search').hide();
$('.recipe-lists').hide();
$('.btn-home').on("click" , function(){
    $('.home').hide();
    $('.search').fadeIn();
    $('#go-home').on("click",function(){
        $('.home').show();
        $('.search').hide();
    });
    $('#go-search').on("click",function(){
        $('.search').show();
        $('.recipe-lists').hide();
    });

});

var recipes = [];
var ingredientsList = [];
    //Make inout values be gone on focus
        var input = $('input.ingredients');


    function addIngredientsToList(index){
        $('input.ingredients').each(function(index){
            // console.log($(this).val());
            ingredientsList.push($(this).val())

        });
    }

    //Add and remove input fields

        var maxItems = 6;
        var x = 1;
        $('#plus').on("click", function(e){
            e.preventDefault();
            if(x < maxItems){
                x++;
            $(".add-input").append('<div><input class="ingredients" type="text"><i id="minus" class="fa fa-minus-circle" aria-hidden="true"></i><div>');
            }
            
            });
        $(".add-input").on("click", "#minus", function(e){ //user click on remove text
            e.preventDefault(); 
            $(this).parent('div').remove(); x--;
        });


  
    $("form").on("submit", function(e){
        e.preventDefault();
        addIngredientsToList();
        $('.search').hide();
        $('.recipe-lists').fadeIn();
        var ingredients = $('.ingredients').val();

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search",
            dataType: "json",
            data: {
                key: "882f2168d0e0186c5f6ffdbd0e93b5e1",
                q: ingredientsList.join()
            },
        })
        .done(function(data){
            recipes = data.recipes;
            listMyRecipe(recipes);
        });

    });


    //Loop through recipeList array and append results to html
    function listMyRecipe(recipeList){
        for ( i= 0; i < recipeList.length; i++ ){
            var item = recipeList[i];  
            //Make a template to append to results
            var template = `
            <div class="item col-sm-6 col-lg-6 col-md-6" data-id='${item.recipe_id}'>
                <img class="imageModal" src="${item.image_url}">
                <h3>${item.title}</h3>
            </div> 
            `;            
            // console.log($('.item').data("id"));   
            $('.results').append(template);
        }
    }

    //Create a modal then send a get request on click
    var modal = $('#myModal');     
    // var btn = $(".imageModal");
    var span = $(".close");

    $(".results").on("click", ".imageModal", function(e){
        var recipeId = $(this).parent().attr("data-id");   
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/http://food2fork.com/api/get",
                dataType: "json",
                data: {
                    key: "882f2168d0e0186c5f6ffdbd0e93b5e1",
                    rId: recipeId
                },
            })
            .done(function(data){
                var allIngredients = data.recipe.ingredients;
                // $('.modal-list').text("<p>" + allIngredients + "</p>");
                organizeIngredients(allIngredients);
                
            });
        modal.css({ 'display': "block" });
    });

    function organizeIngredients(ingredients){
        for( i=0; i < ingredients.length; i++ ){
            var item = ingredients[i];
            $(".modal-list").append('<li>' + item + '</li>');
        }
    }

    span.on("click", function(){
        modal.css({ 'display': "none" });
        
    });

   
});