const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';
const image_URL = 'https://image.tmdb.org/t/p/w185';

const now = '/movie/now_playing';
const discover = '/discover/movie/';

let page = 1;

const genres = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  'Sci Fi': 878,
  'TV Movie': 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

function apiCall(get_URL) {
  return $.getJSON(`${base_URL}${get_URL}${api_key}&page=${page}`);
}

const getMovies = () => {
  apiCall(get_URL)
    .then((data) => {
      showPages(data);
      const movies = data.results;
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        makeCard(movie);
      }
    })
    .catch((err) => {
      console.log('err');
      $('#api-content').append(`<p>${err.responseJSON.status_message}</p>`);
    });
};

const searchMovies = (genre_id) => {
  apiCall(get_URL)
    .then((data) => {
      $('#api-content').empty();
      let movies = data.results;
      const genreName = Object.keys(genres).find(
        (key) => genres[key] === genre_id
      );
      $('title').text(`Cinémas Pathé Gaumont - ${genreName}`);
      for (let movie of movies) {
        if (movie.genre_ids.includes(genre_id)) {
          makeCard(movie);
        }
      }
    })
    .catch((err) => {
      console.log(err);
      $('#api-content').append(`<p>${err.responseJSON.status_message}</p>`);
    });
};

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

// Creates cards as movieHTML and appends to api-content on home
function makeCard(movie) {
  const movieHTML = $('<div class="movie-div">')
    .append(
      `<span class="movie-title-tooltip" id="${movie.id}">${movie.title}</span>`
    )
    .append(
      `<a href="/movies/${movie.id}"><img src="${image_URL}${movie.poster_path}" alt="${movie.title} poster "onerror="this.onerror=''; this.src='./assets/blank.jpg'"></a>`
    ); // If poster load error: load blank.jpg
  $.get(`http://localhost:3000/rating/${movie.id}/user`, function (data) {
    if (data.length === 1 ) {
      // Convert score to out of 5
      let score = data[0].rating
      score%2==0 ? stars = '★'.repeat(score / 2) : stars = '★'.repeat((score / 2)) + '½'
      $(movieHTML).append(`<div id="star" class="rating">${stars}</div>`);
    }
  })
  //  Get community rating by fetching route with SQL for average, convert to percentage and add if community rating exists add badge to poster
  $.get(`http://localhost:3000/rating/`, function (data) {
    let find = data.find(item => {return item.movie_id == movie.id})
    if (find) {
      let rating = Math.round(find.avg * 10);
      let votes = find.count
      $(movieHTML).prepend(`<div id="score" class="score">${rating}%</div>`);
      $(movieHTML).prepend(`<div class="score-count score">${votes} vote/s</div>`);
    }
  })
  $('#api-content').append(movieHTML);
}

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
