var hedgehogs = ["Happy", "Cute", "Surprised"];

$(document).on("click", ".hoggybuttons", function() {
  var hog = $(this).attr("hog");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  hog + " hedgehog" + "&api_key=SMTb3tSlY0U2YO3pw0CTrzbXep49Q8EX&limit=10";

 console.log(queryURL);

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
          var newbutton = $("<button>");
          newbutton.addClass("hoggybuttons");
          newbutton.attr("data-name", hedgehogs[i]);
          newbutton.text(hedgehogs[i]);
          $("#hog-buttons").append(newbutton);
        }
      }

$("#add-hog").on("click", function(event) {
        event.preventDefault();
        var hog = $("#search-hogs").val().trim();
        hedgehogs.push(hog);
        makeButtons();

      });