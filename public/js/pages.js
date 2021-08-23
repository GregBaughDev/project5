$('.next-page').click(() => {
  if (page === 55) return;
  page = page + 1;
  $('#api-content').empty();
  getMovies(page);
  $('title').text(`Cinémas Pathé Gaumont - Page ${page}`);
});

$('.prev-page').click(() => {
  if (page === 1) return;
  page = page - 1;
  $('#api-content').empty();
  getMovies(page);
  $('title').text(`Cinémas Pathé Gaumont - Page ${page}`);
});

document.onkeyup = function (evt) {
  evt = evt || window.event;
  switch (evt.keyCode) {
    case 37:
      $('.prev-page').trigger('click');
      break;
    case 39:
      $('.next-page').trigger('click');
      break;
  }
};

// Updates pages in footer and calculates random page for hidden gem feature
function showPages(data) {
  random_page = Math.floor(Math.random() * data.total_pages) + 1;
  $('#page').text(`Page ${data.page}/${data.total_pages}`);
  if (data.page === 1) {
    $('.prev-page').hide();
    return;
  }
  $('.prev-page').show();
  if (data.page === data.total_pages) return $('.next-page').hide();
}