const measure = require("./");
const test = require("tape");

test("measure directly", async t => {
  await Promise.all(
    [1, 1000, 500].map(
      milliseconds =>
        new Promise(async r => {
          const m = measure();
          await new Promise(resolve => {
            const wait = setTimeout(() => {
              clearTimeout(wait);
              resolve();
            }, milliseconds);

            return wait;
          });
          t.equal(
            m() > milliseconds - 1,
            true,
            `something that takes ${milliseconds} milliseconds`
          );
          r();
        })
    )
  );
  t.end();
});

test("measure with callback", t => {
  let c = 1;
  const mWithCb = measure(250, (timing, s) => {
    s += 1;
    t.equal(s, c + 1, `new value was ${c}, should be ${c + 1}`);
    t.end();
  });

  setTimeout(() => {
    mWithCb(c);
  }, 200);
});
