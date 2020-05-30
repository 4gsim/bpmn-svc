const proxyquire = require("proxyquire");
const { rainbow, client } = require("./data");
const fsStub = {
  existsSync(path) {
    if (path.indexOf("missing") !== -1) {
      return false;
    }
    return true;
  },
  readFile(path, _, cb) {
    if (path.indexOf("rainbow.bpmn") !== -1) {
      return cb(null, rainbow);
    }
    if (path.indexOf("client.form.json") !== -1) {
      return cb(null, client);
    }
  },
};
const definitions = proxyquire("../lib/definitions", {
  fs: fsStub,
});

describe("definitions", function () {
  it("should be able to get a definition", async () => {
    const definition = await definitions.definition("rainbow");
    expect(definition).to.be.equal(rainbow);
  });

  it("should be able to get a form", async () => {
    const form = await definitions.form("client");
    expect(form).to.deep.equal(JSON.parse(client));
  });

  it("should be able to get a default form", async () => {
    const form = await definitions.form("missing");
    expect(form).to.deep.equal({ components: [] });
  });
});
