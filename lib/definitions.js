const fs = require("fs");
const path = require("path");

function Definitions() {
  return {
    definition,
    form,
  };

  function definition(src) {
    const definitionPath = path.join(
      __dirname,
      "..",
      "resources",
      `${src}.bpmn`
    );
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(definitionPath))
        return reject(`definition ${src} does not exist`);
      fs.readFile(definitionPath, "utf-8", (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  function form(key) {
    const formPath = path.join(
      __dirname,
      "..",
      "resources",
      `${key}.form.json`
    );
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(formPath)) return resolve({ components: [] });

      fs.readFile(formPath, "utf-8", (err, data) => {
        if (err) return reject(err);
        return resolve(JSON.parse(data));
      });
    });
  }
}

module.exports = Definitions();
