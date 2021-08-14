// DEV Search Bar functionality
const genre = document.querySelector('.genre')

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

/* event listener is current retrieving genre_id code from user selection
this needs to be passed to a search function to retrieve corresponding films matching code 
This could be passed in here and the films with corresponding ids are appended to DOM */

const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';

function searchMovies(genre_id) {
    $.getJSON(`${base_URL}/discover/movie/${api_key}`)
      .then((data) => {
        const movies = data.results;
        //   API test shows top movie in discover
        for(let mov of movies){
            console.log(mov.genre_ids)
            console.log(genre_id)
            // LOOP OVER GENRE_IDS HERE
            if(mov.genre_ids === genre_id){
                const movieHTML = $('<div>')
                console.log(mov)
                .append(`<h2 class="movie-title">${mov.title}</h2>`)
                .append(`<img alt='${mov.title} poster'>`);
                $('#api-test').append(movieHTML);
            }
        }
      })
      .catch((err) => {
        console.log(err);
        $('#api-test').append(`<p>${err.responseJSON.status_message}</p>`);
      });
  }

  genre.addEventListener('change', (e) => {
    console.log(genres[e.target.value])
    let value = genres[e.target.value]
    searchMovies(value)
})