const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';
const image_URL = 'https://image.tmdb.org/t/p/w185';
const poster_URL = 'https://image.tmdb.org/t/p/original/'

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

const getMovies = () => {
  apiCall()
    .then((data) => {
      const movies = data.results
      const movie = movies[0];
      const movieHTML = $('<div>')
        .append(`<h2 class="movie-title">${movie.title}</h2>`)
        .append(`<img src="${image_URL + movie.poster_path}" alt="${movie.title} poster">`);
        $('#api-test').append(movieHTML);
    })
    .catch((err) => {
      console.log(err);
      $('#api-test').append(`<p>${err.responseJSON.status_message}</p>`);
    })
}

const searchMovies = (genre_id) => {
  apiCall()
    .then((data) => {
      const movies = data.results
      const genreName = Object.keys(genres).find(key => genres[key] === genre_id)
          $('#api-test').append(`<h2 class="genre-search">Movies by genre: ${genreName}</h2>`)
          for(let mov of movies){
              if(mov.genre_ids.includes(genre_id)){
                const movieHTML = $('<div class="genre-search">')
                .append(`<h3 class="movie-title">${mov.title}</h3>`)
                .append(`<img class="genre-image" src='${poster_URL}${mov.poster_path}' alt='${mov.title} poster'>`);
                $('#api-test').append(movieHTML);
            }
        }
    })
    .catch((err) => {
      console.log(err);
      $('#api-test').append(`<p>${err.responseJSON.status_message}</p>`);
    })
}

// On document ready the getMovies function is called
$(document).ready(() => {
  getMovies()
})

// When a genre is selected from the drop down the following is called
$('#genre').change((e) => {
  $('.genre-search').remove()
  searchMovies(genres[e.target.value])
})