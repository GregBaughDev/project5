const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';
const image_URL = 'https://image.tmdb.org/t/p/w185';

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
// TODO: Add API calsl for discover etc and event listeners.
const apiCall = () => {
  return $.getJSON(`${base_URL}/discover/movie/${api_key}`)
}

// changed API call to Now Playing for more dynamic list
const apiCallNowPlaying = () => {
  return $.getJSON(`${base_URL}/movie/now_playing${api_key}&page=${page}`)
}

const getMovies = () => {
  apiCallNowPlaying()
    .then((data) => {
      newPage(data)
      const movies = data.results
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i]
        makeCard(movie)
        }
    })
    .catch((err) => {
      console.log("err");
      $('#api-content').append(`<p>${err.responseJSON.status_message}</p>`);
    })
}

const searchMovies = (genre_id) => {
  apiCallNowPlaying()
    .then((data) => {
      $( "#api-content" ).empty();
      let movies = data.results
      const genreName = Object.keys(genres).find(key => genres[key] === genre_id)
      $('title').text(`Cinémas Pathé Gaumont - ${genreName}`)
          for(let movie of movies){
              if(movie.genre_ids.includes(genre_id)){
                makeCard(movie)
            }
        }
    })
    .catch((err) => {
      console.log(err);
      $('#api-content').append(`<p>${err.responseJSON.status_message}</p>`);
    })
}

// On document ready the getMovies function is called
$(document).ready(() => {
  getMovies(page)
});

// When a genre is selected from the drop down the following is called
$('#genre').change((e) => {
  $('.genre-search').remove()
  $("#next-page").hide()
  $("#prev-page").hide()
  searchMovies(genres[e.target.value])
})

function newPage(data){
      $('#page').text(`Page ${data.page}/${data.total_pages}`)
      if(data.page === 1){
        $(".prev-page").hide()
        return
      }
      $(".prev-page").show()
      if(data.page === data.total_pages) return $(".next-page").hide() 
}

function makeCard(movie){
  const movieHTML = $('<div class="movie-div">')
  .append(`<span class="movie-title-tooltip" id="${movie.id}">${movie.title}</span>`)
  .append(`<a href="/movies/${movie.id}"><img src="${image_URL}${movie.poster_path}" alt="${movie.title} poster "onerror="this.onerror=''; this.src='./assets/blank.jpg'"></a>`) // If poster load error: load blank.jpg
  // TODO: show logged in user's rating of this move in star format
  // .append(`<span id="star" class="rating">${yourrating}</span>`);

  //  Get community rating by fetching route with SQL for average, convert to percentage and add if community rating exists add badge to poster
  $.get( `http://localhost:3000/rating/${movie.id}`, function( data ) {
    let rating = Math.round(data.avg * 10);
    if(data.avg !== null){ 
      $(movieHTML).prepend(`<div id="score">${rating}%</div>`)}
    $('#api-content').append(movieHTML);
  })
}
