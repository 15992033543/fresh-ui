if (typeof jQuery === 'undefined') {
  throw new Error('fresh-ui requires jQuery')
};

$.fn.animEndListener = (callback, duration) => {
  setTimeout(() => { callback() }, duration)
};