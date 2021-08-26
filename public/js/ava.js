const base_URL = 'https://api.themoviedb.org/3';
const api_key = '?api_key=12890aac4bd3d481725b4e373193a5bf';
const image_URL = 'https://image.tmdb.org/t/p/w185/'

function randomMovie(){
    let rndMovie = Math.floor(100000 + Math.random() * 900000);
    $.getJSON(`${base_URL}/movie/${rndMovie}${api_key}`)
    .then((data) => {     
        if(data.poster_path && data.adult === false){
            $('#movie-details')
            .append(`<img class="rounded-circle" style="width: 120px;height: 120px;object-fit:cover" src="${image_URL}${data.poster_path}" alt="${data.title} poster">`)
            $('#ava').append(`<input class="form-control d-none" type="text" name="avatar" id="avatar" value="${data.poster_path}" required readonly>`)   
        }
        else(randomMovie())
    })
    .catch(e => {
        randomMovie()
    })
}
randomMovie()