const engines = require("../engines");
const logger = require("../logger")("execute");

async function listen(event, cb) {
  logger.debug(`received event ${JSON.stringify(event)}`);

  const { bus } = this;
  const { definitionSrc, executionId } = event;

  if (!definitionSrc) return cb(new Error("missing 'definitionSrc'"));

  if (!executionId) return cb(new Error("missing 'executionId'"));

  try {
    await engines.execute(definitionSrc, executionId, bus);
    cb();
  } catch (err) {
    logger.error(err);
    cb(err);
  }
}

module.exports = {
  command: "bpmn-engine.execute",
  listen: listen,
};
