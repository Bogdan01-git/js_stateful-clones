'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // клон начального состояния
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        currentState = clearProperties(state);
        break;
    }
    result.push({ ...currentState }); // сохраняем клон после каждого действия
  }

  return result;
}

function addProperties(state, extraData) {
  return { ...state, ...extraData };
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clearProperties() {
  return {};
}

module.exports = transformStateWithClones;
