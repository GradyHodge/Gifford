console.log("connected");

// create an arraylist of topics that will be turned into buttons
    var topics = ["cats", "dogs", "happy birthday", "DIY", "shopping", "movies", "poopy pants"];

    function renderButtons(){
        for(var i = 0; i< topics.length; i++){
            console.log(topics[i]);

//jquerry creates a html tag/element and then the .text will make the array become the name on the button
           var myButton =  $("<button class= 'giffy btn btn-info m-1'>").text(topics[i]);

//add data to the button tag with data-topics so that we can tie it into our API info next
            myButton.attr("data-wumbo", topics[i]);

           $("#buttons").append(myButton);
        }
    }//endRenderButtonFunction

//add functionality to search button

    $(document).on("click", "#makeTopic", function(event){
        event.preventDefault();
        console.log("clicked");

//get the input value the user entered into the submit field and then take this to make buttons

        var inputBoxValue = $("#topicSearch").val().trim();

        console.log(inputBoxValue);

//this puts the user input into the array
        topics.push(inputBoxValue);

//this deletes everything inside of it. It prevents duplicating the same group of buttons each time.
        $("#buttons").empty();

// this loops over updated array AND generates new buttons  

    renderButtons();

});

$(document).on("click", ".giffy", function(){

    //the gifs need to be emptied when you click on a new set of gifs
    $("#gifPool").empty();

    //console.log("giffy");
    var thisTopic = $(this).attr("data-wumbo");
    console.log(thisTopic);

    var apiKey = "aF85lZvqGsuo8dLOpVqjxw7djGiqgmcm";

    var queryUrl =  "http://api.giphy.com/v1/gifs/search?q=" + thisTopic + "&api_key=" + apiKey + "&limit=15";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })

    .then(function(response){

        var data = response.data
        console.log(data);

        for(i = 0; i< data.length; i++){
            console.log(data[i]);

            var firstImage = data[i].images.fixed_width_still.url;
            var animateImage = data[i].images.fixed_width.url;


            console.log("Images link; ", firstImage);

            var newDiv = $("<div class = 'card bg-info'>");

            var myGif = $("<img class='myGif'src='"+ firstImage +"'>");

            $(myGif).attr({
                "state": "still",
                "data-animate": animateImage,
                "data-still": firstImage
            });

            $(newDiv).append(myGif);

            $("#gifPool").append(newDiv);
        }
    })
});

$(document).on("click", ".myGif", function(){
    console.log("clicked an image!")

    var state = $(this).attr("state");
    console.log(state);
    if(state === "still"){
        console.log("it is still");
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("state", "animated");
    }
    else{
        console.log("in motion");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");
    }
})

//call the renderButtons() function
   
    renderButtons();


