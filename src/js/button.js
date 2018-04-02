/**
 * Button
 * author: hzp
 */
(function ($) {
  class Button {
    constructor (el, option) {
      this.el = el
      this.option = option
    }
    show () {
      this.option.text = this.el.html()
      this.el.prop('disabled', true)
      this.el.html(this.option.loadingHtml)
    }
    hide () {
      this.el.prop('disabled', false)
      this.el.html(this.option.text)
    }
  }

  $.fn.loading = function (type, loadingText='加载中...') {
    if (!type) return
    $(this).each((i, e) => {
      const el = $(e)
      if (!el.is('button')) return
      const loadingHtml = `<i class="icon-btn-loading"></i>${loadingText}`
      let instance = el.data('instance')
      if (instance) {
        instance.option.loadingHtml = loadingHtml
        instance[type]()
      } else {
        instance = new Button(el, { loadingHtml })
        el.data('instance', instance)
        instance[type]()
      }
    })
  }
}(jQuery))