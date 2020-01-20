const request = require("supertest");
const app = require("../app");

const testCsv = `${__dirname}/../timetable.csv`;

describe("API", () => {
  it("tests that / returns the right text", async done => {
    const res = await request(app).get("/");
    expect(JSON.parse(res.text).name).toEqual("Affinity Server 😎");
    done();
  });

  it("tests that /upload works properly", async done => {
    const req = await request(app)
      .post("/upload")
      .attach("csv", testCsv);

    expect(Object.keys(req.body.results).length).toEqual(2);
    done();
  });
});
