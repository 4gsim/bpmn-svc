#!/usr/bin/env node

const logger = require("../lib/logger")("main");
const servicebus = require("servicebus");
const registerHandlers = require("servicebus-register-handlers");
const handler = require("../lib/handler");
require("dotenv").config();

const start = async (onStart) => {
  logger.debug("connecting to servicebus");
  const bus = await new Promise((resolve, reject) => {
    const localBus = servicebus.bus({
      url: "amqp://queue:5672",
      enableConfirms: true,
    });

    localBus.use(localBus.messageDomain());
    localBus.use(localBus.correlate());
    localBus.use(handler());

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
      logger.error(
        "error handling: %s. rejecting message w/ cid %s.",
        err,
        msg.cid
      );
      // logger.error(err);
      msg.handle.reject(err);
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
