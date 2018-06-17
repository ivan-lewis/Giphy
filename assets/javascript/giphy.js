// Array for buttons
var searches = ["fails", "funny", "motorcycle crashes", "sport fails"];

// Create buttons in array
function createButtons() {
    $("#buttons").empty();
    for (var i = 0; i < searches.length; i++) {
        var pButton = $("<button>");
        pButton.attr("data-item", searches[i]);
        pButton.text(searches[i]);
        $("#buttons").append(pButton);
    }
}

// Add new buttons to array and place in the buttons area
$("#add-search").on("click", function (event) {
    event.preventDefault();
    var nSearch = $("#SearchInput").val().trim();
    searches.push(nSearch);
    $("#SearchInput").val("");
    createButtons();
});

createButtons();

function placeGifs() {

    var gifAdd = $(this).attr("data-item");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifAdd + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
    
        .then(function (response) {

            var results = response.data

                console.log(results);

                for (var i = 0; i < results.length; i++) {

                    var stillSrc = results[i].images.original_still;
                    var animatedSrc = results[i].images.original;

                    var imgDiv = $("<div>");
                    var sImage = $("<img>");
                    
                    sImage.attr("src", stillSrc);
                    sImage.attr("data-still", stillSrc);
                    sImage.attr("data-animate", animatedSrc);
                    sImage.attr("data-state", "still");

                    imgDiv.append(sImage);

                    $("#gifs").append(imgDiv);

// Start-Pause
            // sImage.on("click", function () {
            //     var state = $(this).attr("data-state");
    
            //     if (state === "still") {
            //         $(this).attr("src", $(this).attr("data-animate"));
            //         $(this).attr("data-state", "animate");
            //     } else {
            //         $(this).attr("src", $(this).attr("data-still"));
            //         $(this).attr("data-state", "still");
            //     }
            // })


        }
       
    })
}

placeGifs();
