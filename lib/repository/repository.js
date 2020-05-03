function Repository() {
  var executions = {};

  return {
    findOne,
    save,
  };

  function findOne(id) {
    return executions[id];
  }

  function save(execution) {
    executions[execution.id] = execution;
    return Promise.resolve(execution);
  }
}

module.exports = Repository();
