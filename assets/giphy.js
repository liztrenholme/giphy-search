var hedgehogs = ["Happy", "Cute", "Surprised"];

$(document).on("click", ".hoggybuttons", function() {
  var hog = $(this).attr("hog");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  hog + " hedgehog" + "&api_key=SMTb3tSlY0U2YO3pw0CTrzbXep49Q8EX&limit=10";

 // console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    var results = response.data;
   // console.log(results);
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='col-md-4'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var hedgehogGifAnimate = $("<img>");
      hedgehogGifAnimate.attr("src", results[i].images.fixed_width.url).addClass("giphy-image");

      var hedgehogGifStill = $("<img>");
      hedgehogGifStill.attr("src", results[i].images.fixed_width_still.url).addClass("giphy-image");

      gifDiv.append(p);
      gifDiv.append(hedgehogGifStill);

      $("#hog-giphies").prepend(gifDiv);
    

     
    }

  });

});

$("img").on("click", function(results) {
    //  console.log(results[i].images.fixed_width.url);
    //  var image = $(this).attr("src");
      if ($("img").attr("src") === hedgehogGifAnimate) {
        $("img").attr("src", hedgehogGifStill);
     //   $(this).attr("data-state", "animate");
      }

      else if ($("img").attr("src") === hedgehogGifStill) {
        $("img").attr("src", hedgehogGifAnimate);
     //   $(this).attr("data-state", "still");
      }
    });

function makeButtons() {
        $("#hog-buttons").empty();

        for (var i = 0; i < hedgehogs.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var newbutton = $("<button>");
          // Adding a class of movie-btn to our button
          newbutton.addClass("hoggybuttons");
          // Adding a data-attribute
          newbutton.attr("data-name", hedgehogs[i]);
          // Providing the initial button text
          newbutton.text(hedgehogs[i]);
          // Adding the button to the buttons-view div
          $("#hog-buttons").append(newbutton);
        }
      }

$("#add-hog").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var hog = $("#search-hogs").val().trim();

        // The movie from the textbox is then added to our array
        hedgehogs.push(hog);

        // Calling renderButtons which handles the processing of our hog array
        makeButtons();

      });

//$(document).on("click", ".hoggybuttons", displayMovieInfo);