const { readFile } = require("../utils");

const emptyFile = `${__dirname}/../timetable.csv`;

describe("Utils", () => {
  it("tests that readline works properly", async done => {
    readFile(emptyFile).then(files => {
      expect(files.length).toEqual(5);
      done();
    });
  });
});
