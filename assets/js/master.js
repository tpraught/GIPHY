// Initializing Variables
// -----------------------------------------------------------------------------------------------

var topics = ['Sheldon Cooper', 'Leonard Hofstadter', 'Howard Wolowitz', 'Raj Koothrappali', 'Amy Farrah Fowler', 'Bernadette Rostenkowski']

// Functions
// -----------------------------------------------------------------------------------------------

function displayGiphy() {
	$('#searchResults').empty();
	var topic = $(this).attr('data-name');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
        topic + '&api_key=UprIonJRo2c0uAMskYCcXGzmABBRxsoa&limit=10';

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function(response) {
          for(var i=0; i<response.data.length; i++) {
          	var search = $('<div class="searchResult">');
          	var rating = response.data[i].rating;
          	var p = $('<p class="rating">').text('Rating: ' + rating);
          	var animated = response.data[i].images.fixed_height.url;
          	var still = response.data[i].images.fixed_height_still.url;
          	var image = $('<img>');
          	image.attr('src',still);
          	image.attr('data-still', still);
          	image.attr('data-animated', animated);
          	image.attr('data-state', 'still');
          	image.addClass('searchImage');
          	search.append(p);
          	search.append(image);
          	$('#searchResults').append(search);
          }
    })
}

$(document).on('click','.searchImage',function() {
	var state = $(this).attr('data-state');
	if(state == 'still') {
		$(this).attr('src', $(this).data('animated'));
		$(this).attr('data-state','animated');
	} else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state','still');		
	}
})

function renderButtons() {
	$('#buttons').empty();
	for (var i=0; i<topics.length; i++) {
		var a = $('<button>');
		a.addClass('topic');
		a.attr('data-name', topics[i]);
		a.text(topics[i]);
		$('#buttons').append(a);
	}
}

$('#addSearch').on('click', function(event) {
	event.preventDefault();

	var topic = $('#search-input').val().trim();
	topics.push(topic);

	renderButtons();
})

$(document).on('click', '.topic', displayGiphy);

renderButtons();