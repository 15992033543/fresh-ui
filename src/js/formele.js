+function ($) {
  $(window).on('load', function () {
    const select = $('select[pertty]')
    select.each(function () {
      $(this).data('data-instance', $(this))
    })
  })

  $(window).on('load.bs.select.data-api', function () {
    console.log('dff')
  })
}(jQuery)