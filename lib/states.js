const fs = require("fs");
const path = require("path");

function States() {
  return {
    findOne,
    save,
  };

  async function findOne(id) {
    const exists = fs.existsSync(path.join(process.env.STORAGE_PATH, id));
    if (!exists) return null;

    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(process.env.STORAGE_PATH, id),
        "utf-8",
        (err, data) => {
          if (err) return reject(err);
          resolve(JSON.parse(data));
        }
      );
    });
  }

  function save(execution) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(process.env.STORAGE_PATH, execution.id),
        JSON.stringify(execution),
        (err) => {
          if (err) return reject(err);
          resolve(execution);
        }
      );
    });
  }
}

module.exports = States();
