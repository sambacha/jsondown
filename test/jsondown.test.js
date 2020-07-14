const test = require("tape");
const suite = require("abstract-leveldown/test");
const JsonDOWN = require("../jsondown");
const tempy = require("tempy");

const testCommon = suite.common({
  test,
  factory: () => new JsonDOWN(tempy.directory()),
});

suite(testCommon);

test("setUp", testCommon.setUp);

test("location includes file name", function (t) {
  const db = testCommon.factory();
  db.location = db.location + "/data.json";

  // default createIfMissing=true, errorIfExists=false
  db.open(function (err) {
    t.error(err);
    db.close(function () {
      t.end();
    });
  });
});

test("malformed JSON should return an error", (t) => {
  const db = testCommon.factory();
  const location = tempy
    .write("{", {
      extension: "json",
    })
    .then((filename) => {
      db.location = filename;
      db.open((err) => {
        t.match(
          err.toString(),
          new RegExp(`Error parsing JSON in ${filename}:`, "g"),
          "malformed json returns error"
        );
        t.end();
      });
    });
});

test("tearDown", testCommon.tearDown);
//
// test('test simple put()', function (t) {
//
//   db.put('foo', 'bar', function (err) {
//     t.error(err)
//     db.get('foo', function (err, value) {
//       t.error(err)
//       var result = value.toString()
//       if (isTypedArray(value)) {
//         result = String.fromCharCode.apply(null, new Uint16Array(value))
//       }
//       t.equal(result, 'bar')
//       t.end()
//     })
//   })
// })
