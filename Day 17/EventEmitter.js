module.exports = () => {
    const emitterController = {};

    return {
        emit,
        on,
        listenerCount,
        listeners
    }

    function on(event, callback) {
        if (event in emitterController)
            emitterController[event].push(callback);
        else
            emitterController[event] = [ callback ];
    }

    function emit(event, ...args) {
        if (event in emitterController) {
            for (const callback of emitterController[event]) {
                callback(...args);
            }
        }
    }

    function listenerCount(event) {
        return event in emitterController ? emitterController[event].length : 0;
    }

    function listeners(event) {
        return event in emitterController ? [...emitterController[event]] : [];
    }
}