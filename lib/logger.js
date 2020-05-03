const Debug = require("debug");

module.exports = function Logger(scope) {
  return {
    debug: Debug("bpmn-svc:" + scope),
    error: Debug("bpmn-svc:error:" + scope),
    warn: Debug("bpmn-svc:warn:" + scope),
  };
};
