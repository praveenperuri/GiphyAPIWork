 // Initial array of topics
 var topics = ["Lebron James", "Odell Beckham Jr.", "Cristiano Ronaldo", "Tom Brady", "LeVeon Bell", "JJ Watt", "Von Miller", "Michael Phelps", "Roger Federer"];

 // displaytopicInfo function re-renders the HTML to display the appropriate content
 function displayInfo() {

     var topic = $(this).attr("data-name");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";

     // Creates AJAX call for the specific topic button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).done(function(response) {

         // YOUR CODE GOES HERE!!!
         console.log(response);

         var myJSON = JSON.stringify(response.data);

         var picCounter = 0;

         var topicInfo = $("<div>");

         var head = $("<h3>");

         topicInfo.addClass("container");

         head.text(topic);

         topicInfo.append(head);

         for (i = 0; i < response.data.length; i++) {

             // if (response.data[i].user == null || response.data[i].user.length == 0) {
             //     continue;
             // }

             var gifDiv = $("<div>");

             var rating = $("<label>");

             var poster = $("<img>");

             poster.addClass("image");

             gifDiv.addClass("framer");

             rating.text("Rating: " + response.data[i].rating);

             poster.attr("still-src", response.data[i].images.downsized_still.url);

             poster.attr("src", response.data[i].images.downsized_still.url);

             //poster.attr("src", response.data[i].user.avatar_url); //.images.original_still.url

             poster.attr("title", "Click Me");

             //poster.attr("still-src", response.data[i].user.avatar_url);

             poster.attr("still-src", response.data[i].images.downsized_still.url);

             poster.attr("anim-src", response.data[i].images.downsized.url);

             gifDiv.append(rating, "<br/>", poster);

             topicInfo.append(gifDiv);

             $("#topics-view").prepend(topicInfo);

             picCounter++;


             // if (picCounter == 10) {
             //     break;
             // }

         }

     });

 }

 // Function for displaying topic data
 function renderButtons() {

     // Deletes the topics prior to adding new topics
     // (this is necessary otherwise you will have repeat buttons)
     $("#buttons-view").empty();

     // Loops through the array of topics
     for (var i = 0; i < topics.length; i++) {

         // Then dynamicaly generates buttons for each topic in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
         // Adds a class of topic to our button
         a.addClass("topic");
         // Added a data-attribute
         a.attr("data-name", topics[i]);
         // Provided the initial button text
         a.text(topics[i]);
         // Added the button to the buttons-view div
         $("#buttons-view").append(a);
     }
 }

 // This function handles events where the add topic button is clicked
 $("#add-topic").on("click", function(event) {
     event.preventDefault();
     // This line of code will grab the input from the textbox
     var topic = $("#topic-input").val().trim();

     // The topic from the textbox is then added to our array
     topics.push(topic);

     $("#topic-input").val('');

     // Calling renderButtons which handles the processing of our topic array
     renderButtons();

 });

 function animateGif() {
     var stillsrc = $(this).attr("still-src");
     var gifsrc = $(this).attr("anim-src");
     var origsrc = $(this).attr("src");
     if (origsrc === stillsrc) {
         $(this).attr("src", gifsrc);
     } else {
         $(this).attr("src", stillsrc);
     }
 }


 // Adding click event listeners to all elements with a class of "topic"
 $(document).on("click", ".topic", displayInfo);

 $(document).on("click", ".image", animateGif);

 $(document).ready(function() {

     renderButtons();

 });


 //renderButtons();
