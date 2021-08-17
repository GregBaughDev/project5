const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';
const image_URL = 'https://image.tmdb.org/t/p/w185';
const poster_URL = 'https://image.tmdb.org/t/p/original/'

let page = 1

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
    "Sci Fi": 878,
    "TV Movie": 10770,
    Thriller: 53,
    War: 10752,
    Western: 37
}

const apiCall = () => {
  return $.getJSON(`${base_URL}/discover/movie/${api_key}`)
}

// changed API call to Now Playing for more dynamic list
const apiCallNowPlaying = () => {
  return $.getJSON(`${base_URL}/movie/now_playing${api_key}&page=${page}`)
}


// TODO: [RD] Add better movie title UI i.e. no text overflow

const getMovies = (page) => {
  apiCallNowPlaying()
    .then((data) => {
      const movies = data.results
      for (let i = 0; i < movies.length; i++) {
      const movie = movies[i]
      const movieHTML = $('<div class="movie-div">')
        .append(`<h5 class="movie-title" id="${movie.id}">${movie.title}</h5>`)
        .append(`<a href="/details/${movie.id}"><img src="${image_URL + movie.poster_path}" alt="${movie.title} poster"></a>`)
        $('#api-test').append(movieHTML);
      }
      // Change page title and add pagination, if first page: don't include prev button
      $('#page-title').append(`<h2>Now Playing</h2>`);
      $("#pages").removeClass("d-none")
      if(page === 1) return $(".prev-page").addClass("d-none")
      $(".prev-page").removeClass("d-none")
    })
    .catch((err) => {
      console.log(err);
      $('#api-test').append(`<p>${err.responseJSON.status_message}</p>`);
    })
}

const searchMovies = (genre_id) => {
  apiCallNowPlaying()
    .then((data) => {
      $( "#api-test" ).empty();
      $( "#page-title" ).empty();
      const movies = data.results
      const genreName = Object.keys(genres).find(key => genres[key] === genre_id)
          for(let mov of movies){
              if(mov.genre_ids.includes(genre_id)){
                const movieHTML = $('<div class="movie-div">')
                .append(`<h5 class="movie-title">${mov.title}</h5>`)
                .append(`<a href="/details/${mov.id}"><img src='${image_URL}${mov.poster_path}' alt='${mov.title} poster'></a>`);
                $('#api-test').append(movieHTML);
            }
        }
        // Change page title and remove pagination
        $('#page-title').append(`<h2 class="genre-search">Movies by Genre: ${genreName}</h2>`);
        $("#pages").addClass("d-none")
    })
    .catch((err) => {
      console.log(err);
      $('#api-test').append(`<p>${err.responseJSON.status_message}</p>`);
    })
}

// On document ready the getMovies function is called
$(document).ready(() => {
  getMovies(page)

});

// Next page
$(".next-page").click(() => {
  page = page + 1
  $("#api-test").empty()
  $("#page-title").empty()
  getMovies(page)
})

//  Previous page
$(".prev-page").click(() => {
  page = page - 1
  $("#api-test").empty()
  $("#page-title").empty()
  getMovies(page)
})

// When a genre is selected from the drop down the following is called
$('#genre').change((e) => {
  $('.genre-search').remove()
  searchMovies(genres[e.target.value])
})

