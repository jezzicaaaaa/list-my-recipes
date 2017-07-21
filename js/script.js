$(document).ready(function(){

    var recipes = [];
    var ingredientsList = [];
        //Make inout values be gone on focus
    var input = $('input.ingredients');

    //Create a modal then send a get request on click
    var modal = $('#myModal');     
    // var btn = $(".imageModal");
    var span = $(".close");

    var page = 1;


    //Loop through recipeList array and append results to html
    function listMyRecipe(recipeList){
        for ( i= 0; i < recipeList.length; i++ ){
            var item = recipeList[i];  
            //Make a template to append to results
            var template = `
                <div class="item" data-id='${item.recipe_id}' style="background-image: url(${item.image_url});">
                    <div class="title-container">
                        <h3>${item.title}</h3>
                    </div>
                </div>
            `;            
            // console.log($('.item').data("id"));   
            $('.results').append(template);
        }
    }

    function addIngredientsToList(index){
        $('input.ingredients').each(function(index){
            // console.log($(this).val());
            ingredientsList.push($(this).val())
        });
    }

    function organizeIngredients(ingredients, image){
        $(".image").css('background-image', 'url(' + image + ')');
        for( i=0; i < ingredients.length; i++ ){
            var item = ingredients[i];
            $(".modal-list").append('<li>' + item + '</li>');

           
        }
    }
    

    $('.search').hide();
    $('.recipe-lists').hide();
    $('.btn-home').on("click" , function(){
        $('.home').hide();
        $('.search').fadeIn();
        $('.ingredients').focus();
        $('#go-home').on("click",function(){
            $('.home').show();
            $('.search').hide();
        });
        $('#go-search').on("click",function(){
            page = 1;
            ingredientsList = [];
            $('.add-input').empty();
            $('.search').show();
            $('.ingredients').val('');
            $('.recipe-lists').hide();
            $('.see-more').hide();
        });

    });

    //Add and remove input fields

    var maxItems = 6;
    var x = 1;
    $('#plus').on("click", function(e){
        e.preventDefault();
        if(x < maxItems){
            x++;
        $(".add-input").append('<div><input class="ingredients" type="text"><i id="minus" class="fa fa-minus-circle" aria-hidden="true"></i><div>');}
        $('.ingredients').focus();
        
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
        $('.loader').show();
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
            $('.loader').fadeOut(); 
            $('.results').empty();
            if( recipes.length == 0){
                $('.results').append('<p class ="no-result">results not found! :(</p>');
                $('.see-more').hide();
            }
            // console.log(recipes);
            listMyRecipe(recipes);
            if (data.count == 30){
                $('.see-more').show();
            }  
        });
    });
    $('.see-more').on('click', function(){
        $(this).html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>')
        page++;
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search",
            dataType: "json",
            data: {
                key:  "882f2168d0e0186c5f6ffdbd0e93b5e1",
                q: ingredientsList.join(),
                page: page 
            },
        })
        .done(function(data){
            $('.see-more').html('see more');
            recipes = data.recipes;
            $('.loader').fadeOut(); 
            // console.log(recipes);
            listMyRecipe(recipes);
            
            if (data.count == 30){
                $('.see-more').show();
            }  
            else $(".see-more").hide();
        });
        

    });

    $(".results").on("click", ".title-container", function(e){
        $(".modal-list").empty();
        $('.image').empty();
        $('.loader').show();
        var recipeId = $(this).parent().attr("data-id");   
        console.log(recipeId); 
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/http://food2fork.com/api/get",
                dataType: "json",
                data: {
                    key: "882f2168d0e0186c5f6ffdbd0e93b5e1",
                    rId: recipeId
                },
            })
            .done(function(data){
                $('.loader').fadeOut();
                var allIngredients = data.recipe.ingredients;
                var image = data.recipe.image_url;
                organizeIngredients(allIngredients, image);        
            });
        modal.css({ 'display': "block" });
    });
    span.on("click", function(){
        modal.css({ 'display': "none" });
    });   
});

