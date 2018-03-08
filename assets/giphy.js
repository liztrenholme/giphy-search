$("button").on("click", function() {
  var hedgehog = $(this).attr("hedgehog");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  hedgehog + " hedgehog" + "&api_key=SMTb3tSlY0U2YO3pw0CTrzbXep49Q8EX&limit=10";

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
    

    $("img").on("click", function(results) {
    //  console.log(results[i].images.fixed_width.url);
      var image = $(this).attr("src");
      if (image === hedgehogGifAnimate) {
        $(this).replaceWith(hedgehogGifStill);
     //   $(this).attr("data-state", "animate");
      }

      else if (image === hedgehogGifStill) {
        $(this).replaceWith(hedgehogGifAnimate);
     //   $(this).attr("data-state", "still");
      }
    }); 
}
  //  hedgehogGif.attr("src", results[i].images.fixed_height_still.url);
  });

});