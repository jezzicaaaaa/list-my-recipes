$(document).ready(function(){

$('.search').hide();
$('.recipe-lists').hide();
$('.btn-home').on("click" , function(){
    $('.home').hide();
    $('.search').fadeIn();
//   $("#ingredients").on("focus", function() {
//         $("#ingredients").val("");
});

var recipes = [];
    //Make inout values be gone on focus
    $(function() {
        var input = $('input[type=text]');
        input.focus(function() {
            $(this).val('');
        });
    });


    //Add and remove input fields

        var maxItems = 6;
        var x = 1;
        $('#plus').on("click", function(e){
            e.preventDefault();
            if(x < maxItems){
                x++;
            $(".add-input").append('<div><input id="ingredients" class="ingredients" type="text"><i id="minus" class="fa fa-minus-circle" aria-hidden="true"></i><div>');
            }
            
            });
        $(".add-input").on("click", "#minus", function(e){ //user click on remove text
            e.preventDefault(); 
            $(this).parent('div').remove(); x--;
        });


  
    $("form").on("submit", function(e){
        e.preventDefault();
        $('.search').hide();
        $('.recipe-lists').fadeIn();
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

   


    //Create a loop to run results and put it in an array
    function listMyRecipe(recipeList){
        for ( i= 0; i < recipeList.length; i++ ){
            var mylists = recipeList[i];  

        //Make a template to append results to//
        var template = `
        <div class = "lists row col-sm-6 col-lg-6 col-md-6">
            <h3> ${mylists.title}</h3>
            <a href = "${mylists.f2f_url}" target="_blank">
                <img src =" ${mylists.image_url} ">
            </a>
        </div> 
        `;            
        console.log(mylists);   
        $('.results').append(template);
        }
    }
        
});