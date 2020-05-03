#!/usr/bin/env node

const logger = require("../lib/logger")("main");
const servicebus = require("servicebus");
const registerHandlers = require("servicebus-register-handlers");
const retry = require("servicebus-retry");

const start = async (onStart) => {
  logger.debug("connecting to servicebus");
  const bus = await new Promise((resolve, reject) => {
    const localBus = servicebus.bus({
      url: "amqp://queue:5672",
    });

    localBus.use(
      retry({
        store: new retry.MemoryStore(),
      })
    );

    localBus.on("ready", function () {
      resolve(localBus);
    });
    localBus.on("error", function (err) {
      logger.error(err);
      reject(err);
    });
  });
  logger.debug("connected to servicebus");

  logger.debug("registering handlers");
  await registerHandlers({
    bus,
    handleError: function handleError(msg, err) {
      logger.error(err);
      msg.handle.reject(function () {
        throw err;
      });
    },
    path: "./lib/handlers",
  });
  logger.debug("registered handlers");

  onStart();
};

const onStart = () => {
  logger.debug("service is running");
};

start(onStart);