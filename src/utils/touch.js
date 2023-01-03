const TouchEvent = (function() {
  const supportsTouch = 'ontouchstart' in window;
  const events = supportsTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
  function getEvent(e) {
    return supportsTouch ? e.changedTouches[0] : e;
  }
  return {
    events,
    getEvent,
  }
})()
export default TouchEvent;