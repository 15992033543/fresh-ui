;(function ($) {
  $.fn.loading = function (type, text='加载中...') {
    if (!type) return
    $(this).each((i, e) => {
      const $el = $(e)
      if (!$el.is('button')) return
      const btnText = $el.data('btn-text')
      !btnText && $el.data('btn-text', $el.html())
      const isShow = type === 'show'
      const html = isShow ? `<i class="icon-btn-loading"></i>${text}` : btnText
      $el.html(html)
      $el.prop('disabled', isShow)
    })
  }
}(jQuery))