$(document).ready(function() {

  var presentAnimals = [
    "pig", "dog", "cat", "whale", "chicken",
    "bird", "ferret", "cat", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "goldfish",
    "hamster", "dog", "serval", "rabbit", "frog"
  ];

  function showButtons(listToUse, classToAdd, AddTo) {
    $(AddTo).empty();
    for (var i = 0; i < listToUse.length; i++) {
      var btn = $("<button>");
      btn.addClass(classToAdd);
      btn.attr("data-type", listToUse[i]);
      btn.text(listToUse[i]);
      $(AddTo).append(btn);
    }

  }

  $(document).on("click", ".animal-button", function() {
    $("#presentAnimals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");
    var type = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=27S1z4Jv5SsPymN8Cn2jf78TINSj17tI&limit=12";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        var result = response.data;
        for (var i = 0; i < result.length; i++) {
          var nameDiv = $("<div class=\"animal-item\">");

          var rating = result[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = result[i].images.fixed_height.url;
          var still = result[i].images.fixed_height_still.url;

          var queryImage = $("<img>");
          queryImage.attr("src", still);
          queryImage.attr("data-still", still);
          queryImage.attr("data-animate", animated);
          queryImage.attr("data-state", "still");
          queryImage.addClass("animal-image");
          nameDiv.append(p);
          nameDiv.append(queryImage);
          $("#presentAnimals").append(nameDiv);
        }
      });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      presentAnimals.push(newAnimal);
    }

    showButtons(presentAnimals, "animal-button", "#all-buttons");

  });

  showButtons(presentAnimals, "animal-button", "#all-buttons");
});
