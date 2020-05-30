const proxyquire = require("proxyquire");
const { rainbow, client } = require("./data");
const definitionsStub = {
  definition() {
    return Promise.resolve(rainbow);
  },
  form() {
    return Promise.resolve(client);
  },
};
const states = [];
const statesStub = {
  findOne() {
    return Promise.resolve({
      id: "1",
      definitionSrc: "rainbow",
      state: "running",
      stopped: false,
      engineVersion: "8.6.0",
      environment: { settings: {}, variables: {}, output: {} },
      definitions: [
        {
          id: "Definitions_1twtxb7",
          type: "bpmn:Definitions",
          executionId: "Definitions_1twtxb7_2ef63b82",
          status: "executing",
          counters: { completed: 0, discarded: 0 },
          environment: {
            settings: {},
            variables: {
              fields: {
                routingKey: "run.execute",
                exchange: "run",
                consumerTag: "_process-run",
              },
              content: {
                id: "rainbow",
                type: "bpmn:Process",
                name: "Rainbow",
                parent: { id: "Definitions_1twtxb7", type: "bpmn:Definitions" },
                executionId: "rainbow_26f27f43",
              },
              properties: {
                messageId: "smq.mid-33972f",
                timestamp: 1588926580358,
              },
            },
            output: {},
          },
          execution: {
            executionId: "Definitions_1twtxb7_2ef63b82",
            stopped: false,
            completed: false,
            status: "executing",
            processes: [
              {
                id: "rainbow",
                type: "bpmn:Process",
                name: "Rainbow",
                parent: { id: "Definitions_1twtxb7", type: "bpmn:Definitions" },
                executionId: "rainbow_26f27f43",
                status: "executing",
                counters: { completed: 0, discarded: 0, terminated: 0 },
                broker: {
                  exchanges: [
                    {
                      name: "run",
                      type: "topic",
                      options: { durable: true, autoDelete: false },
                      deliveryQueue: {
                        name: "delivery-q",
                        options: { autoDelete: true },
                        messages: [],
                        messageCount: 0,
                      },
                      bindings: [
                        {
                          id: "run-q/run.#",
                          options: { priority: 0 },
                          pattern: "run.#",
                          queueName: "run-q",
                        },
                      ],
                    },
                    {
                      name: "format",
                      type: "topic",
                      options: { durable: true, autoDelete: false },
                      deliveryQueue: {
                        name: "delivery-q",
                        options: { autoDelete: true },
                        messages: [],
                        messageCount: 0,
                      },
                      bindings: [
                        {
                          id: "format-run-q/run.#",
                          options: { priority: 0 },
                          pattern: "run.#",
                          queueName: "format-run-q",
                        },
                      ],
                    },
                    {
                      name: "execution",
                      type: "topic",
                      options: { durable: true, autoDelete: false },
                      deliveryQueue: {
                        name: "delivery-q",
                        options: { autoDelete: true },
                        messages: [],
                        messageCount: 0,
                      },
                      bindings: [
                        {
                          id: "execution-q/execution.#",
                          options: { priority: 0 },
                          pattern: "execution.#",
                          queueName: "execution-q",
                        },
                      ],
                    },
                    {
                      name: "message",
                      type: "topic",
                      options: { durable: true, autoDelete: true },
                      deliveryQueue: {
                        name: "delivery-q",
                        options: { autoDelete: true },
                        messages: [],
                        messageCount: 0,
                      },
                    },
                  ],
                  queues: [
                    {
                      name: "run-q",
                      options: { autoDelete: false, durable: true },
                      messages: [
                        {
                          fields: {
                            routingKey: "run.execute",
                            exchange: "run",
                            consumerTag: "_process-run",
                          },
                          content: {
                            id: "rainbow",
                            type: "bpmn:Process",
                            name: "Rainbow",
                            parent: {
                              id: "Definitions_1twtxb7",
                              type: "bpmn:Definitions",
                            },
                            executionId: "rainbow_26f27f43",
                          },
                          properties: {
                            messageId: "smq.mid-33972f",
                            timestamp: 1588926580358,
                          },
                        },
                      ],
                      messageCount: 1,
                    },
                    {
                      name: "format-run-q",
                      options: { autoDelete: false, durable: true },
                      messages: [],
                      messageCount: 0,
                    },
                    {
                      name: "execution-q",
                      options: { autoDelete: false, durable: true },
                      messages: [],
                      messageCount: 0,
                    },
                    {
                      name: "execute-rainbow_26f27f43-q",
                      options: { autoDelete: false, durable: true },
                      messages: [
                        {
                          fields: {
                            routingKey: "activity.wait",
                            exchange: "event",
                            consumerTag: "_process-activity-rainbow_26f27f43",
                          },
                          content: {
                            executionId: "StartEvent_1_2f390886",
                            id: "StartEvent_1",
                            type: "bpmn:StartEvent",
                            parent: {
                              id: "rainbow",
                              type: "bpmn:Process",
                              executionId: "rainbow_26f27f43",
                            },
                            isStart: true,
                            form:
                              '{\n        "name": "client",\n        "title": "Client Form",\n        "components": [\n          {\n            "label": "Client",\n            "spellcheck": true,\n            "tableView": true,\n "calculateServer": false,\n           "validate": {\n              "required": true\n            },\n            "key": "client",\n            "type": "textfield",\n            "input": true\n          }\n        ]\n      }\n      ',
                            state: "wait",
                            isRootScope: true,
                          },
                          properties: {
                            persistent: true,
                            messageId: "smq.mid-86bb1b",
                            timestamp: 1588926580395,
                          },
                        },
                      ],
                      messageCount: 1,
                    },
                  ],
                },
                execution: {
                  executionId: "rainbow_26f27f43",
                  stopped: false,
                  completed: false,
                  status: "executing",
                  children: [
                    {
                      id: "StartEvent_1",
                      type: "bpmn:StartEvent",
                      parent: { id: "rainbow", type: "bpmn:Process" },
                      isStart: true,
                      status: "executing",
                      executionId: "StartEvent_1_2f390886",
                      stopped: false,
                      behaviour: {
                        $type: "bpmn:StartEvent",
                        id: "StartEvent_1",
                        formKey: "client",
                      },
                      counters: { taken: 0, discarded: 0 },
                      broker: {
                        exchanges: [
                          {
                            name: "run",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "run-q/run.#",
                                options: { priority: 0 },
                                pattern: "run.#",
                                queueName: "run-q",
                              },
                            ],
                          },
                          {
                            name: "format",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "format-run-q/run.#",
                                options: { priority: 0 },
                                pattern: "run.#",
                                queueName: "format-run-q",
                              },
                            ],
                          },
                          {
                            name: "execution",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "execute-q/execute.#",
                                options: { priority: 100 },
                                pattern: "execute.#",
                                queueName: "execute-q",
                              },
                              {
                                id: "execution-q/execution.#",
                                options: { priority: 0 },
                                pattern: "execution.#",
                                queueName: "execution-q",
                              },
                            ],
                          },
                        ],
                        queues: [
                          {
                            name: "run-q",
                            options: { autoDelete: false, durable: true },
                            messages: [
                              {
                                fields: {
                                  routingKey: "run.execute",
                                  exchange: "run",
                                  consumerTag: "_activity-run",
                                },
                                content: {
                                  executionId: "StartEvent_1_2f390886",
                                  id: "StartEvent_1",
                                  type: "bpmn:StartEvent",
                                  parent: {
                                    id: "rainbow",
                                    type: "bpmn:Process",
                                  },
                                  isStart: true,
                                  form:
                                    '{\n        "name": "client",\n        "title": "Client Form",\n        "components": [\n          {\n"label": "Client",\n            "spellcheck": true,\n            "tableView": true,\n    "calculateServer": false,\n            "validate": {\n              "required": true\n            },\n            "key": "client",\n            "type": "textfield",\n        "input": true\n          }\n        ]\n      }\n      ',
                                },
                                properties: {
                                  messageId: "smq.mid-4a43b",
                                  timestamp: 1588926580393,
                                },
                              },
                            ],
                            messageCount: 1,
                          },
                          {
                            name: "format-run-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "execution-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "inbound-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "execute-q",
                            options: { autoDelete: false, durable: true },
                            messages: [
                              {
                                fields: {
                                  routingKey: "execute.start",
                                  exchange: "execution",
                                  consumerTag: "_activity-execute",
                                },
                                content: {
                                  executionId: "StartEvent_1_2f390886",
                                  id: "StartEvent_1",
                                  type: "bpmn:StartEvent",
                                  parent: {
                                    id: "rainbow",
                                    type: "bpmn:Process",
                                  },
                                  isStart: true,
                                  form:
                                    '{\n        "name": "client",\n        "title": "Client Form",\n        "components": [\n          {\n            "label": "Client",\n            "spellcheck": true,\n      "tableView": true,\n            "calculateServer": false,\n            "validate": {\n              "required": true\n            },\n            "key": "client",\n            "type": "textfield",\n            "input": true\n          }\n        ]\n      }\n      ',
                                  state: "start",
                                  isRootScope: true,
                                },
                                properties: {
                                  messageId: "smq.mid-653323",
                                  timestamp: 1588926580395,
                                },
                              },
                            ],
                            messageCount: 1,
                          },
                        ],
                      },
                      execution: { completed: false },
                    },
                    {
                      id: "bidOnePager",
                      type: "bpmn:UserTask",
                      name: "Bid One-Pager",
                      parent: { id: "rainbow", type: "bpmn:Process" },
                      stopped: false,
                      behaviour: {
                        $type: "bpmn:UserTask",
                        id: "bidOnePager",
                        name: "Bid One-Pager",
                        formKey: "bidOnePager",
                      },
                      counters: { taken: 0, discarded: 0 },
                      broker: {
                        exchanges: [
                          {
                            name: "run",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "run-q/run.#",
                                options: { priority: 0 },
                                pattern: "run.#",
                                queueName: "run-q",
                              },
                            ],
                          },
                          {
                            name: "format",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "format-run-q/run.#",
                                options: { priority: 0 },
                                pattern: "run.#",
                                queueName: "format-run-q",
                              },
                            ],
                          },
                          {
                            name: "execution",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "execution-q/execution.#",
                                options: { priority: 0 },
                                pattern: "execution.#",
                                queueName: "execution-q",
                              },
                            ],
                          },
                        ],
                        queues: [
                          {
                            name: "run-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "format-run-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "execution-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "inbound-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                        ],
                      },
                    },
                    {
                      id: "Event_1h50wpr",
                      type: "bpmn:EndEvent",
                      parent: { id: "rainbow", type: "bpmn:Process" },
                      isEnd: true,
                      stopped: false,
                      behaviour: {
                        $type: "bpmn:EndEvent",
                        id: "Event_1h50wpr",
                      },
                      counters: { taken: 0, discarded: 0 },
                      broker: {
                        exchanges: [
                          {
                            name: "run",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "run-q/run.#",
                                options: { priority: 0 },
                                pattern: "run.#",
                                queueName: "run-q",
                              },
                            ],
                          },
                          {
                            name: "format",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "format-run-q/run.#",
                                options: { priority: 0 },
                                pattern: "run.#",
                                queueName: "format-run-q",
                              },
                            ],
                          },
                          {
                            name: "execution",
                            type: "topic",
                            options: { durable: true, autoDelete: false },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                            bindings: [
                              {
                                id: "execution-q/execution.#",
                                options: { priority: 0 },
                                pattern: "execution.#",
                                queueName: "execution-q",
                              },
                            ],
                          },
                        ],
                        queues: [
                          {
                            name: "run-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "format-run-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "execution-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                          {
                            name: "inbound-q",
                            options: { autoDelete: false, durable: true },
                            messages: [],
                            messageCount: 0,
                          },
                        ],
                      },
                    },
                  ],
                  flows: [
                    {
                      id: "Flow_0soqtbe",
                      type: "bpmn:SequenceFlow",
                      sourceId: "StartEvent_1",
                      targetId: "bidOnePager",
                      counters: { looped: 0, take: 0, discard: 0 },
                      broker: {
                        exchanges: [
                          {
                            name: "event",
                            type: "topic",
                            options: {
                              durable: true,
                              autoDelete: false,
                              prefix: "flow",
                            },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                          },
                        ],
                      },
                    },
                    {
                      id: "Flow_1var5sp",
                      type: "bpmn:SequenceFlow",
                      sourceId: "bidOnePager",
                      targetId: "Event_1h50wpr",
                      counters: { looped: 0, take: 0, discard: 0 },
                      broker: {
                        exchanges: [
                          {
                            name: "event",
                            type: "topic",
                            options: {
                              durable: true,
                              autoDelete: false,
                              prefix: "flow",
                            },
                            deliveryQueue: {
                              name: "delivery-q",
                              options: { autoDelete: true },
                              messages: [],
                              messageCount: 0,
                            },
                          },
                        ],
                      },
                    },
                  ],
                  messageFlows: [],
                  associations: [],
                },
              },
            ],
          },
          broker: {
            exchanges: [
              {
                name: "run",
                type: "topic",
                options: { durable: true, autoDelete: false },
                deliveryQueue: {
                  name: "delivery-q",
                  options: { autoDelete: true },
                  messages: [],
                  messageCount: 0,
                },
                bindings: [
                  {
                    id: "run-q/run.#",
                    options: { priority: 0 },
                    pattern: "run.#",
                    queueName: "run-q",
                  },
                ],
              },
              {
                name: "format",
                type: "topic",
                options: { durable: true, autoDelete: false },
                deliveryQueue: {
                  name: "delivery-q",
                  options: { autoDelete: true },
                  messages: [],
                  messageCount: 0,
                },
                bindings: [
                  {
                    id: "format-run-q/run.#",
                    options: { priority: 0 },
                    pattern: "run.#",
                    queueName: "format-run-q",
                  },
                ],
              },
              {
                name: "execution",
                type: "topic",
                options: { durable: true, autoDelete: false },
                deliveryQueue: {
                  name: "delivery-q",
                  options: { autoDelete: true },
                  messages: [],
                  messageCount: 0,
                },
                bindings: [
                  {
                    id: "execution-q/execution.#",
                    options: { priority: 0 },
                    pattern: "execution.#",
                    queueName: "execution-q",
                  },
                ],
              },
            ],
            queues: [
              {
                name: "run-q",
                options: { autoDelete: false, durable: true },
                messages: [
                  {
                    fields: {
                      routingKey: "run.execute",
                      exchange: "run",
                      consumerTag: "_definition-run",
                    },
                    content: {
                      id: "Definitions_1twtxb7",
                      type: "bpmn:Definitions",
                      executionId: "Definitions_1twtxb7_2ef63b82",
                    },
                    properties: {
                      messageId: "smq.mid-877eb2",
                      timestamp: 1588926580347,
                    },
                  },
                ],
                messageCount: 1,
              },
              {
                name: "format-run-q",
                options: { autoDelete: false, durable: true },
                messages: [],
                messageCount: 0,
              },
              {
                name: "execution-q",
                options: { autoDelete: false, durable: true },
                messages: [],
                messageCount: 0,
              },
              {
                name: "execute-Definitions_1twtxb7_2ef63b82-q",
                options: { autoDelete: false, durable: true },
                messages: [
                  {
                    fields: {
                      routingKey: "process.start",
                      exchange: "event",
                      consumerTag:
                        "_definition-activity-Definitions_1twtxb7_2ef63b82",
                    },
                    content: {
                      id: "rainbow",
                      type: "bpmn:Process",
                      name: "Rainbow",
                      parent: {
                        id: "Definitions_1twtxb7",
                        type: "bpmn:Definitions",
                        executionId: "Definitions_1twtxb7_2ef63b82",
                      },
                      executionId: "rainbow_26f27f43",
                      state: "start",
                    },
                    properties: {
                      type: "start",
                      mandatory: false,
                      messageId: "smq.mid-3a126e",
                      timestamp: 1588926580359,
                    },
                  },
                ],
                messageCount: 1,
              },
            ],
          },
          source:
            '{"id":"Definitions_1twtxb7","type":"bpmn:Definitions","activities":[{"id":"StartEvent_1","type":"bpmn:StartEvent","parent":{"id":"rainbow","type":"bpmn:Process"},"behaviour":{"$type":"bpmn:StartEvent","id":"StartEvent_1","formKey":"client"}},{"id":"bidOnePager","type":"bpmn:UserTask","name":"Bid One-Pager","parent":{"id":"rainbow","type":"bpmn:Process"},"behaviour":{"$type":"bpmn:UserTask","id":"bidOnePager","name":"Bid One-Pager","formKey":"bidOnePager"}},{"id":"Event_1h50wpr","type":"bpmn:EndEvent","parent":{"id":"rainbow","type":"bpmn:Process"},"behaviour":{"$type":"bpmn:EndEvent","id":"Event_1h50wpr"}}],"associations":[],"dataObjects":[],"definition":{"id":"Definitions_1twtxb7","type":"bpmn:Definitions","targetNamespace":"http://bpmn.io/schema/bpmn","exporter":"Camunda Modeler","exporterVersion":"3.7.1"},"messageFlows":[],"processes":[{"id":"rainbow","type":"bpmn:Process","name":"Rainbow","parent":{"id":"Definitions_1twtxb7","type":"bpmn:Definitions"},"behaviour":{"$type":"bpmn:Process","id":"rainbow","name":"Rainbow","isExecutable":true,"flowElements":[{"$type":"bpmn:StartEvent","id":"StartEvent_1","formKey":"client"},{"$type":"bpmn:UserTask","id":"bidOnePager","name":"Bid One-Pager","formKey":"bidOnePager"},{"$type":"bpmn:SequenceFlow","id":"Flow_0soqtbe"},{"$type":"bpmn:EndEvent","id":"Event_1h50wpr"},{"$type":"bpmn:SequenceFlow","id":"Flow_1var5sp"}]}}],"sequenceFlows":[{"id":"Flow_0soqtbe","type":"bpmn:SequenceFlow","parent":{"id":"rainbow","type":"bpmn:Process"},"targetId":"bidOnePager","sourceId":"StartEvent_1","behaviour":{"$type":"bpmn:SequenceFlow","id":"Flow_0soqtbe"}},{"id":"Flow_1var5sp","type":"bpmn:SequenceFlow","parent":{"id":"rainbow","type":"bpmn:Process"},"targetId":"Event_1h50wpr","sourceId":"bidOnePager","behaviour":{"$type":"bpmn:SequenceFlow","id":"Flow_1var5sp"}}]}',
        },
      ],
    });
  },
  save(state) {
    states.push(state);
    return state;
  },
};
const busStub = {
  publish() {},
};

describe("engines", function () {
  let engines;

  beforeEach(() => {
    engines = proxyquire("../lib/engines", {
      "./definitions": definitionsStub,
      "./states": statesStub,
    });
  });

  it("should be able to execute a process", async () => {
    await engines.execute("rainbow", "1", busStub);
    const execution = await engines.get("1");

    expect(states.length).to.be.equal(4);
    expect(execution).to.not.be.undefined;
    expect(execution.getPostponed().length).to.be.equal(1);
  });

  it("should be able to recover a engine", async () => {
    const execution = await engines.get("1", busStub);

    expect(execution.getPostponed().length).to.be.equal(1);
  });
});
