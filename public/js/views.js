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

// When a genre is selected from the drop down the following is called
$('#genre').change((e) => {
  $('.genre-search').remove();
  $('#next-page').hide();
  $('#prev-page').hide();
  searchMovies(genres[e.target.value]);
});

// Changes API call route and highlights button
$('#top').click(() => {
  $('a').removeClass('active');
  $('#top').addClass('active');
  $('#next-page').hide();
  $('#prev-page').hide();
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
  $('#api-content').empty();
  getMovies();
});
$('#discover').click(() => {
  page = 1;
  get_URL = discover;
  $('a').removeClass('active');
  $('#discover').addClass('active');
  $('#api-content').empty();
  getMovies();
});
$('#random').click(() => {
  page = random_page;
  $('#random').addClass('active');
  $('#api-content').empty();
  getMovies();
});
