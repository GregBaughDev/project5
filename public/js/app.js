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

const getMovies = () => {
  apiCallNowPlaying()
    .then((data) => {
      const movies = data.results
      for (let i = 0; i < movies.length; i++) {
      const movie = movies[i]
      let title = movie.title
      const movieHTML = $('<div class="movie-div">')
        .append(`<span class="movie-title-tooltip" id="${movie.id}">${title}</span>`)
        .append(`<a href="/movies/${movie.id}"><img src="${image_URL}${movie.poster_path}" alt="${title} poster "onerror="this.onerror=''; this.src='./assets/blank.jpg'"></a>`) // If poster load error: load blank.jpg
        // TODO: Community rating should be from DB
        .append(`<span id="star" class="rating">★★★★★</span>`);
        $('#api-content').append(movieHTML);
      }
      // Change page title and add pagination, if first or last page: don't include pagination
      // TODO: Refactor or move to separate JS file
      $(".pages").removeClass("d-none")
      if(data.page === 1){
        $(".prev-page").addClass("d-none")
        $('#page').text(`Page ${data.page}/${data.total_pages}`)
        return
      }
      $(".prev-page").removeClass("d-none")
      if(data.page === data.total_pages) return $(".next-page").addClass("d-none")
      $(".next-page").removeClass("d-none")
      console.log(data.page)
      $('#page').text(`Page ${data.page}/${data.total_pages}`)
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
          for(let mov of movies){
              if(mov.genre_ids.includes(genre_id)){
                const movieHTML = $('<div class="movie-div">')
                .append(`<span class="movie-title-tooltip">${mov.title}</span>`)
                .append(`<a href="/movies/${mov.id}"><img src='${image_URL}${mov.poster_path}' alt='${mov.title} poster "onerror="this.onerror=''; this.src='./assets/blank.jpg'"></a>`)
                // TODO: Community rating should be from DB
                // Unicode stars are placeholder and can be replaced with different rating system/svgs
                .append(`<span id="star" class="rating">★★★★★</span>`);
                $('#api-content').append(movieHTML);
            }
        }
        // Change page title and remove pagination
        $('#page-title').text(`Movies by Genre: ${genreName}`).addClass("genre-search");
        $('#page').text(``)
        $("#next-page").addClass("d-none")
        $("#prev-page").addClass("d-none")
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
  searchMovies(genres[e.target.value])
})
