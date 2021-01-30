const myPromise = executor => {
  const states = {
    pending: 0,
    fulfilled: 1,
    rejected: 2,
  };

  let state = states.pending;

  let value = null;

  const promiseFlag = true;

  let resHandlers = [];
  let rejHandlers = [];

  const resolve = result => {
    state = states.fulfilled;
    value = result;

    for (const handler of resHandlers) handler(value);
  };

  const reject = reason => {
    state = states.rejected;
    value = reason;

    for (const handler of rejHandlers) handler(value);
  };

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }

  return {
    state,
    value,
    promiseFlag,

    then: function (onResolved, onRejected) {
      return myPromise((resolve, reject) => {
        if (typeof onResolved !== 'function') {
          onResolved = result => result;
        }

        if (typeof onRejected !== 'function') {
          onRejected = reason => {
            throw reason;
          };
        }

        resHandlers.push(result => {
          try {
            let r = onResolved(result);

            if (r === undefined) {
              resolve(undefined);
              return;
            }

            if (r.promiseFlag) {
              if (r.state === states.fulfilled) resolve(r.value);
              else if (r.state === states.rejected) reject(r.value);
              else {
                r.then(resolve, reject);
              }

              return;
            }

            resolve(r);
          } catch (err) {
            reject(err);
          }
        });

        rejHandlers.push(reason => {
          try {
            let r = onRejected(reason);

            resolve(r);
          } catch (err) {
            reject(err);
          }
        });
      });
    },

    catch: function (rejFunction) {
      return this.then(undefined, rejFunction);
    },

    finally: function (onFinally) {
      return this.then(onFinally, onFinally);
    },
  };
};

let promise1 = myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('string');
  }, 2000);
});

promise1
  .then(res => {
    return res.toUpperCase();
  })
  .then(upperRes => console.log(upperRes))
  .catch(rej => console.log(rej))
  .finally(() => console.log('finally'));

console.log(myPromise.createResolve());
