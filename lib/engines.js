const bpmn = require("bpmn-engine");
const logger = require("./logger")("engines");
const states = require("./states");
const definitions = require("./definitions");

function Manager() {
  let executions = {};

  return {
    get,
    execute,
  };

  async function get(executionId, bus) {
    if (executions[executionId]) return executions[executionId];

    const persistedExecution = await states.findOne(executionId);
    if (!persistedExecution) return persistedExecution;

    logger.debug(`recovering engine with execution ${executionId}`);
    let bpmnEngine = await create(
      persistedExecution.definitionSrc,
      persistedExecution.id,
      bus
    );

    bpmnEngine = await bpmnEngine.recover(persistedExecution);

    const execution = await bpmnEngine.resume();
    executions[executionId] = execution;

    return execution;
  }

  async function execute(definitionSrc, executionId, bus) {
    const bpmnEngine = await create(definitionSrc, executionId, bus);

    const execution = await bpmnEngine.execute();

    // the event will be sent after all execution events are sent
    bus.publish("bpmn-engine.event.pushed", {
      executionId: executionId,
      type: "bpmn:Engine",
    });

    executions[executionId] = execution;

    await persist(executionId, definitionSrc, execution, bus);
  }

  async function create(definitionSrc, executionId, bus) {
    const source = await definitions.definition(definitionSrc);

    const bpmnEngine = bpmn.Engine({
      source: source,
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

            definitions.form(activity.behaviour.formKey).then((form) => {
              activity.broker.publish("format", endRoutingKey, { form });
            });
          });
        },
      },
    });

    bpmnEngine.broker.subscribeTmp(
      "event",
      "#",
      onEventBuilder(executionId, definitionSrc, bus)
    );

    return bpmnEngine;
  }

  async function persist(executionId, definitionSrc, execution) {
    const state = await execution.getState();

    const persistedExecution = await states.save({
      id: executionId,
      definitionSrc,
      ...state,
    });
    logger.debug(`persisted execution with id ${persistedExecution.id}`);
  }

  function onEventBuilder(id, definitionSrc, bus) {
    return async function onEvent(_, message, owner) {
      bus.publish("bpmn-engine.event.pushed", {
        ...message.content,
        engineExecutionId: id,
        definitionId: message.content.id,
        id: message.content.executionId,
      });

      try {
        const state = await owner.getState();
        const execution = {
          id,
          definitionSrc,
          ...state,
        };
        await states.save(execution);
      } catch (err) {
        logger.error(err);
      }

      message.ack();
    };
  }
}

module.exports = Manager();
