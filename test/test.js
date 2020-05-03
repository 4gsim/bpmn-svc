var { listen } = require("../lib/handlers/start");

describe("start", function () {
  it("should be able to start an engine", function (done) {
    listen({}, done);
  });
});
