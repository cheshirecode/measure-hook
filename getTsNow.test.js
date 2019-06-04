const getTsNow = require("./getTsNow");
const test = require("tape");

test("getTsNow()", async t => {
  const now = getTsNow();
  await new Promise(resolve => {
    const wait = setTimeout(() => {
      clearTimeout(wait);
      resolve();
    }, 1000);

    return wait;
  });
  const after = getTsNow();
  t.equal(
    Math.floor((after - now - 1000) / 10),
    0,
    `2 timestamps after 1 second should differ by 1000ms with a margin of 0.1%`
  );
  t.end();
});
