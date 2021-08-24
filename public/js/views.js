const now = '/movie/now_playing';
const discover = '/discover/movie/';

// On document ready the getMovies function is called
$(document).ready(() => {
  // Default is Now playing
  get_URL = now;
  $('a').removeClass('active');
  $('#now').addClass('active');
  getMovies();
});

// Navbar view API events
// When a genre is selected from the drop down the following is called
$('#genre').change((e) => {
  console.log('g')
  $('.genre-search').remove();
  $('#more').hide();
  searchMovies(genres[e.target.value]);
});

$('#top').click(() => {
  $('a').removeClass('active');
  $('#top').addClass('active');
  $('#more').hide();
  $('#page').text(``);
  $('#api-content').empty();
  $.get(`http://localhost:3000/top/`, function (data) {
    for(let i = 0; i< data.length; i++){
      $.getJSON(`${base_URL}/movie/${data[i].movie_id}${api_key}`)
        .then((data) => {
          makeCard(data)
        })
        .catch(e => {
            console.log(e)
        })
    }
  })
})

$('#now').click(() => {
  page = 1;
  get_URL = now;
  $('a').removeClass('active');
  $('#now').addClass('active');
  $('#more').show();
  $('#api-content').empty();
  getMovies();
});
$('#discover').click(() => {
  page = 1;
  get_URL = discover;
  $('a').removeClass('active');
  $('#discover').addClass('active');
  $('#more').show();
  $('#api-content').empty();
  getMovies();
});
$('#random').click(() => {
  page = random_page;
  $('#random').addClass('active');
  $('#api-content').empty();
  $('#more').show();
  getMovies();
});
