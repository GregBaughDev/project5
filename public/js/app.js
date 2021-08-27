const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';
const image_URL = 'https://image.tmdb.org/t/p/w185';

genres = {
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
    "Sci Fi": 878,
    "TV Movie": 10770,
    Thriller: 53,
    War: 10752,
    Western: 37
}

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

// Creates cards as movieHTML and appends to api-content on home
const makeCard = (movie, page) => {
  const movieHTML = $('<div class="movie-div">')
    .append(
      `<span class="movie-title-tooltip" id="${movie.id}">${movie.title}</span>`
    )
    .append(
      `<a href="/movies/${movie.id}"><img src="${image_URL}${movie.poster_path}" alt="${movie.title} poster "onerror="this.onerror=''; this.src='./assets/blank.jpg'"></a>`
    ); // If poster load error: load blank.jpg
  if(page){
    $.get(`http://localhost:3000/rating/${movie.id}/user`, function (data) {
        let score = data.rating
        score%2==0 ? stars = '★'.repeat(score / 2) : stars = '★'.repeat((score / 2)) + '½'
        $(movieHTML).append(`<div id="star" class="rating">${stars}</div>`);
    })
    return $('#api-content').append(movieHTML);
  }  
  //  Get community score by fetching route with SQL for average, convert to percentage and add if community rating exists add badge to poster
  $.get(`http://localhost:3000/rating/`, function (data) {
    let find = data.find(item => {return item.movie_id == movie.id})
    if (find) {
      let score = find.avg * 10;
      let votes = find.count
      $(movieHTML).prepend(`<div id="score" class="score">${score}%</div>`);
      $(movieHTML).prepend(`<div class="score-count score">${votes} vote/s</div>`);
    }
  })
  $.get(`http://localhost:3000/rating/${movie.id}/user`, function (data) {
    if (data.rating) {
      $('.movie-div').addClass("watched")
    }
  })
  $('#api-content').append(movieHTML);
}


// Pagination
let page = 1
const showPages = (data) => {
  random_page = Math.floor(Math.random() * data.total_pages) + 1;
  $('#page').text(`Page ${data.page}/${data.total_pages}`);
  if (data.page === data.total_pages) return $('#more').hide();

}

$(window).scroll(function() {
  if(page === 3){
    $('#more').text("Enable Infinite Scroll")
    $( "footer" ).addClass( "position-fixed" );
  }
  if($(window).scrollTop() == $(document).height() - $(window).height() && page > 3) {
    $('#more').hide()
    $('#more').text("Load More")
    page = page + 1;
    getMovies(page);
    $('title').text(`Cinémas Pathé Gaumont - Page ${page}`);
  }
});

$('#more').click(() => {
  page = page + 1;
  getMovies(page);
  $('title').text(`Cinémas Pathé Gaumont - Page ${page}`);
});
