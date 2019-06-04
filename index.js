/** global window */

const getTsNow = require("./getTsNow");
module.exports = (timeout = 10000, cb) => {
  if (typeof window === "undefined") window = {}; //eslint-disable-line no-global-assign
  let start = window.__NOW__ || getTsNow(); // eslint-disable-line no-underscore-dangle
  let t;
  let measure = () => {
    const timing = getTsNow() - start;
    clearTimeout(t);
    /* istanbul ignore if */
    if (window.__NOW__) {
      window.__NOW__ = 0; // eslint-disable-line no-underscore-dangle
    }
    const cbType = cb ? cb.toString() : "";
    /* istanbul ignore if */
    if (
      cbType == "[object Function]" ||
      cbType == "[object AsyncFunction]" ||
      cbType == "[object GeneratorFunction]" ||
      cbType == "[object Proxy]"
    ) {
      return cb(timing);
    }
    return timing;
  };
  // clear out these potential memory leaks after 10s (we don't expect any operations to take that long)
  /* istanbul ignore next */
  t = setTimeout(() => {
    start = "";
    measure = "";
    /* istanbul ignore if */
    if (window.__NOW__) {
      window.__NOW__ = 0; // eslint-disable-line no-underscore-dangle
    }
  }, timeout);

  return measure;
};
