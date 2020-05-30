const engines = require("../engines");
const logger = require("../logger")("signal");

async function listen(event, cb) {
  logger.debug(`received event ${JSON.stringify(event)}`);

  const { bus } = this;

  try {
    const execution = await engines.get(event.executionId, bus);
    if (!execution)
      return cb(
        new Error(
          `cannot find engine execution with executionId:${event.executionId}`
        )
      );

    execution
      .getPostponed()
      .filter((activity) => activity.executionId === event.activityId)
      .forEach((activity) => activity.signal(event.signal));

    cb();
  } catch (err) {
    logger.error(err);
    cb(err);
  }
}

module.exports = {
  command: "bpmn-engine.signal",
  listen: listen,
};
