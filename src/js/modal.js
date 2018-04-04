/**
 * Modal
 * author: hzp
 */
(function ($) {
  class Modal {
    constructor (el) {
      this.el = el
    }
    show () {
      this.el.css('display', 'block')
      if(this.el.hasClass('anim')) {
        this.el.css('opacity', 0)
        this.el[0].offsetWidth
        this.el.css('opacity', 1).find('.modal-content').addClass('scale-anim').animEndListener(200, () => {
          this.el.find('.modal-content').removeClass('scale-anim')
        })
      }
    }
    hide () {
      this.el.css('display', 'none')
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
}(jQuery))