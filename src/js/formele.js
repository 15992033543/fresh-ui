;(function ($) {
  $(window).on('load', function () {
    const select = $('select[pertty]')
    select.each(function () {
      $(this).data('data-instance', $(this))
    })
  })
}(jQuery))