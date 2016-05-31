/**
 * Created by Guang on 16/4/26.
 */

"use strict";

function warn(error) {
    console.warn(error.message || error);
    throw error
}

module.exports = store => next => action =>
    typeof action.then === 'function'
        ? Promise.resolve(action).then(next,warn)
        : next(action);