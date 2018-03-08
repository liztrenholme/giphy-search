var hedgehogs = ["Happy", "Cute", "Surprised"];
var animate = false;

// listening for click on buttons to search
$(document).on("click", ".hoggybuttons", function() {
  var hog = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  hog + " hedgehog" + "&api_key=SMTb3tSlY0U2YO3pw0CTrzbXep49Q8EX&limit=10";
  //console.log(hog);
  //console.log(queryURL);

// getting the data from Giphy's site and putting it into variables to use later
$.ajax({
  url: queryURL,
  method: "GET"
})
.then(function(response) {
  var results = response.data;
  for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div class='col-md-4'>");
    var rating = results[i].rating;
    var p = $("<p>").text("Rating: " + rating);
    var hogURL = results[i].images.fixed_width_still.url;
    var hedgehogGif = $("<img src='" + hogURL + "' data-animate='" + results[i].images.fixed_width.url + "' data-still='" + results[i].images.fixed_width_still.url + "' class='giphy-image'>");

      // adding image data into DOM
      gifDiv.append(p);
      gifDiv.append(hedgehogGif);
      $("#hog-giphies").prepend(gifDiv);
    }
  });
});

// turning the animation of the gifs on and off
$(document).on("click", ".giphy-image", function() {
  if (animate === false) {
    $(this).attr("src", $(this).attr("data-animate"));
    animate = true;
  }
  else if (animate === true) {
    $(this).attr("src", $(this).attr("data-still"));
    animate = false;
  }
});

// creating the search parameter buttons from user input 
function makeButtons() {
  $("#hog-buttons").empty();
  for (var i = 0; i < hedgehogs.length; i++) {
    var newbutton = $("<button>");
    newbutton.addClass("hoggybuttons");
    newbutton.attr("data-name", hedgehogs[i]);
    newbutton.text(hedgehogs[i]);
    $("#hog-buttons").append(newbutton);
  }
}
// listens for click and adds user input to makeButtons function
$("#add-hog").on("click", function(event) {
  event.preventDefault();
  var hog = $("#search-hogs").val().trim();
  hedgehogs.push(hog);
  makeButtons();
});