// modal
+function ($) {
  class Modal {
    constructor (el) {
      this.el = el
      this.content = this.el.find('.modal-content')
      this.content.css('transition-duration', '100ms')
    }
    show () {
      this.el.css('display', 'block')
      this.content.css('transform', 'scale(0.95, 0.95)')
      this.content[0].offsetWidth // 强制回流，否则transition无效
      this.content.css('transform', 'scale(1, 1)')
    }
    hide () {
      this.content.css('transform', 'scale(0.95, 0.95)').animEndListener(() => {
        this.el.css('display', 'none')
      }, 100)
    }
  }

  $.fn.modal = function (option) {
    let data = this.data('instance')
    if (!data) {
      data = new Modal($(this))
      this.data('instance', data)
      data.show()
    } else {
      if (option === 'show') {
        data.show()
      } else if (option === 'hide') {
        data.hide()
      }
    }
  }
}(jQuery)