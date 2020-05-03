const bpmn = require("bpmn-engine");
const fs = require("fs");
const path = require("path");
const repository = require("../repository/repository");
const logger = require("../logger")("execute");

function listen(event, cb) {
  logger.debug(`received event ${JSON.stringify(event)}`);

  const { bus } = this;
  const { executionId } = event;

  if (!executionId) return cb(new Error("Missing 'executionId'"));

  let bpmnEngine = bpmn.Engine({
    source: fs.readFileSync(
      path.join(__dirname, "..", "..", "resources", "rainbow.bpmn")
    ),
    moddleOptions: {
      camunda: require("camunda-bpmn-moddle/resources/camunda"),
    },
    extensions: {
      fetchForm(activity) {
        if (!activity.behaviour.formKey) return;

        const endRoutingKey = "run.form.end";

        activity.on("enter", () => {
          activity.broker.publish("format", "run.form.start", {
            endRoutingKey,
          });

          getForm(activity).then((form) => {
            activity.broker.publish("format", endRoutingKey, { form });
          });
        });
      },
    },
  });

  bpmnEngine.broker.subscribeTmp(
    "event",
    "#",
    onEventBuilder(executionId, bus)
  );
  bpmnEngine
    .execute()
    .then((execution) => {
      execution.id = executionId;
      repository.save(execution).then((persistedExecution) => {
        logger.debug(`created execution with id ${persistedExecution.id}`);

        // the event will be sent after all execution events are sent
        bus.publish("bpmn-engine.event.pushed", {
          executionId: executionId,
          type: "bpmn:Engine",
        });

        cb();
      });
    })
    .catch((err) => {
      logger.error(err);
      cb(err);
    });
}

function getForm(activity) {
  return new Promise((resolve) => {
    const formPath = path.join(
      __dirname,
      "..",
      "..",
      "resources",
      `${activity.behaviour.formKey}.form.json`
    );
    if (!fs.existsSync(formPath)) resolve({ components: [] });
    resolve(JSON.parse(fs.readFileSync(formPath)));
  });
}

function onEventBuilder(id, bus) {
  return function onEvent(routingKey, message, owner) {
    logger.debug(message);
    bus.publish("bpmn-engine.event.pushed", {
      ...message.content,
      engineExecutionId: id,
      definitionId: message.content.id,
      id: message.content.executionId,
    });

    // owner.getState().then((state) => {
    //   repository.update({
    //     id: owner.id,
    //     ...state,
    //   });
    // });

    message.ack();
  };
}

module.exports = {
  command: "bpmn-engine.execute",
  listen: listen,
};