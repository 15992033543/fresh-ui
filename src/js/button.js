+function ($) {
  $.fn.loading = function (type, text='加载中...') {
    if (!type) return
    $(this).each((i, e) => {
      const el = $(e)
      if (!el.is('button')) return
      const btnText = el.data('btn-text')
      if (!btnText) {
        el.data('btn-text', el.html())
      }
      if (type === 'show') {
        el.html(`<i class="icon-btn-loading"></i>${text}`)
        el.prop('disabled', true)
      } else if (type === 'hide') {
        el.html(btnText)
        el.prop('disabled', false)
      }
    })
  }
}(jQuery)