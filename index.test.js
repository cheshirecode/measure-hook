const measure = require("./");
const test = require("tape");

test("measure directly", async t => {
  await Promise.all(
    [1, 1000, 500, 2000].map(
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
