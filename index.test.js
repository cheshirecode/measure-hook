const measure = require("./");
const test = require("tape");

test("measure", async t => {
  let m = measure();
  (() => {})();

  t.equal(m() > 0.001, true, "noop takes around 0.001 milliseconds");

  await Promise.all([
    new Promise(async r => {
      m = measure();
      await new Promise(resolve => {
        const wait = setTimeout(() => {
          clearTimeout(wait);
          resolve();
        }, 1000);

        return wait;
      });
      t.equal(m() > 1000, true, "something that takes 1000 milliseconds");
      r();
    }),
    new Promise(async r => {
      m = measure();
      await new Promise(resolve => {
        const wait = setTimeout(() => {
          clearTimeout(wait);
          resolve();
        }, 500);

        return wait;
      });
      t.equal(m() > 500, true, "something that takes 500 milliseconds");
      r();
    }),
    new Promise(async r => {
      m = measure();
      await new Promise(resolve => {
        const wait = setTimeout(() => {
          clearTimeout(wait);
          resolve();
        }, 2000);

        return wait;
      });
      t.equal(m() > 2000, true, "something that takes 2000 milliseconds");
      r();
    })
  ]);

  t.end();
});
