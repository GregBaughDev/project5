const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';
const poster_URL = 'https://image.tmdb.org/t/p/original/'

$.getJSON(`${base_URL}/movie/${movie_id}${api_key}`)
    .then((data) => {
    const year = data.release_date.substring(0, 4)
    $('#movie-details').append(`<h3 class="movie-title">${data.title} - ${year}</h3>`)
    .append(`<img class="genre-image my-2" src="${poster_URL}${data.poster_path}" alt="${data.title} poster">`)
    .append(`<p class="my-2 w-50">${data.overview}</p>`)
    $('head').append(`<title>Details for ${data.title}</title>`)
    })
    .catch(e => {
        console.log(e)
    })

$('input#rating').change(() => {
    let value = $('input#rating').val()
    $('#rating-dsp').text(`Your rating is: ${value}`)
})