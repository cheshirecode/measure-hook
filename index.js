/** global window */

module.exports = (timeout = 10000) => {
  if (typeof window === "undefined") window = {}; //eslint-disable-line no-global-assign
  if (typeof performance === "undefined")
    performance = require("perf_hooks").performance; //eslint-disable-line no-global-assign
  let start = window.__NOW__ || performance.now(); // eslint-disable-line no-underscore-dangle
  let t;
  let cb = payload => {
    const timing = performance.now() - start;
    /* istanbul ignore if */
    if (window.__NOW__) {
      window.__NOW__ = 0; // eslint-disable-line no-underscore-dangle
    }
    clearTimeout(t);
    /* istanbul ignore if */
    if (window.dataLayer) {
      window.dataLayer.push({
        ...payload,
        timingValue: timing
      });
    }
    return timing;
  };
  // clear out these potential memory leaks after 10s (we don't expect any operations to take that long)
  /* istanbul ignore next */
  t = setTimeout(() => {
    start = "";
    cb = "";
    /* istanbul ignore if */
    if (window.__NOW__) {
      window.__NOW__ = 0; // eslint-disable-line no-underscore-dangle
    }
  }, timeout);

  return cb;
};
