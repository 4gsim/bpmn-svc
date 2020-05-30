const proxyquire = require("proxyquire");
const path = require("path");
const fsStub = {
  files: {
    ["storage\\stored"]: '{"id":"stored","state":"state"}',
  },

  writeFile(path, data, cb) {
    this.files[path] = data;
    cb();
  },
  existsSync() {
    return true;
  },
  readFile(path, _, cb) {
    cb(null, this.files[path]);
  },
};
const states = proxyquire("../lib/states", {
  fs: fsStub,
});

describe("states", function () {
  const env = Object.assign({}, process.env);

  afterEach(() => {
    process.env = env;
  });
  it("should be able to save a state", async () => {
    process.env.STORAGE_PATH = "storage";
    const execution = {
      id: "id",
      state: "xxx",
    };
    await states.save(execution);
    expect(JSON.parse(fsStub.files[path.join("storage", "id")])).to.deep.equal(
      execution
    );
  });

  it("should be able to get a state", async () => {
    process.env.STORAGE_PATH = "storage";

    const actual = await states.findOne("stored");

    expect(JSON.stringify(actual)).to.deep.equal(
      fsStub.files["storage\\stored"]
    );
  });
});
