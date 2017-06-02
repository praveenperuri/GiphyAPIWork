 // Initial array of topics
 var topics = ["Lebron James", "Odell Beckham Jr.", "Cristiano Ronaldo", "Tom Brady", "LeVeon Bell", "JJ Watt", "Von Miller", "Michael Phelps", "Roger Federer"];

 // display topic Info function re-renders the HTML to display the appropriate content
 function displayInfo() {

     var topic = $(this).attr("data-name");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";

     // Creates AJAX call for the specific topic button being clicked
     $.ajax({
         url: queryURL,
         method: "GET"
     }).done(function(response) {

         console.log(response);

         var myJSON = JSON.stringify(response.data);

         var picCounter = 0;

         var topicInfo = $("<div>");

         var head = $("<h3>");

         topicInfo.addClass("container");

         head.text(topic);

         topicInfo.append(head);

         for (i = 0; i < response.data.length; i++) {

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

             //poster.attr("still-src", response.data[i].images.downsized_still.url);

             poster.attr("anim-src", response.data[i].images.downsized.url);

             gifDiv.append(rating, "<br/>", poster);

             topicInfo.append(gifDiv);

             $("#topics-view").prepend(topicInfo);

             picCounter++;



         }

     });

 }


 function renderButtons() {

     $("#buttons-view").empty();

     for (var i = 0; i < topics.length; i++) {

         var a = $("<button>");

         a.addClass("topic");

         a.attr("data-name", topics[i]);

         a.text(topics[i]);

         $("#buttons-view").append(a);
     }
 }

 $("#add-topic").on("click", function(event) {
     event.preventDefault();

     var topic = $("#topic-input").val().trim();


     topics.push(topic);

     $("#topic-input").val('');


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


 $(document).on("click", ".topic", displayInfo);

 $(document).on("click", ".image", animateGif);

 $(document).ready(function() {

     renderButtons();

 });


 //renderButtons();
