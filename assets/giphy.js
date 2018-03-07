$("button").on("click", function() {
  var hedgehog = $(this).attr("hedgehog");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  hedgehog + " hedgehog" + "&api_key=SMTb3tSlY0U2YO3pw0CTrzbXep49Q8EX&limit=10";

  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var hedgehogGif = $("<img>");
      hedgehogGif.attr("src", results[i].images.fixed_height.url);

      gifDiv.append(p);
      gifDiv.append(hedgehogGif);

      $("#hog-giphies").prepend(gifDiv);
    }
  });
});