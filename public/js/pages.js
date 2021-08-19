
// Next page
$(".next-page").click(() => {
  if(page === 55) return
  page = page + 1
  $("#api-content").empty()
  getMovies(page)
})

//  Previous page
$(".prev-page").click(() => {
  if(page === 1) return
  page = page - 1
  $("#api-content").empty()
  getMovies(page)
})

// Arrow Keys
document.onkeyup = function(evt) {
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
