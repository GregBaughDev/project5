const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';
const image_URL = 'https://image.tmdb.org/t/p/w185';

function getMovies() {
  $.getJSON(base_URL + '/discover/movie' + api_key)
    .then((data) => {
      console.log(data);
      const movies = data.results;
      //   API test shows top movie in discover
      const movie = movies[0];
      const movieHTML = $('<div>')
        .append(`<h2 class="movie-title">${movie.title}</h2>`)
        .append(
          `<img src="${image_URL + movie.poster_path}" alt="${
            movie.title
          } poster">`
        );
      $('#api-test').append(movieHTML);
    })
    .catch((err) => {
      console.log(err);
      $('#api-test').append(`<p>${err.responseJSON.status_message}</p>`);
    });
}

getMovies();