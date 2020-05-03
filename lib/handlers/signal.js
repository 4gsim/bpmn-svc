const repository = require("../repository/repository");
const logger = require("../logger")("signal");

function listen(event, cb) {
  logger.debug(`received event ${event}`);

  const execution = repository.findOne(event.engineExecutionId);
  if (!execution)
    return cb(
      new Error(
        `cannot find engine execution with executionId:${event.engineExecutionId}`
      )
    );

  execution
    .getPostponed()
    .filter((activity) => activity.executionId === event.activityExecutionId)
    .forEach((activity) => activity.signal(event.signal));

  cb();
}

module.exports = {
  command: "bpmn-engine.signal",
  listen: listen,
};
