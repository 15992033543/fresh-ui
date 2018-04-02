/*
 * fresh-ui
 * version: v1.0.0
 * author: hzp
 * email: 395342674@qq.com
 */
if (typeof jQuery === 'undefined') {
  throw new Error('fresh-ui requires jQuery')
}

$.fn.animEndListener = (callback, duration) => {
  setTimeout(() => { callback() }, duration)
}