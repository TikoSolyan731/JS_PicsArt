const coroutine = generator => {
  return () => {
    let iterator = generator();

    return new Promise((res, rej) => {
      isPromise(iterator.next());

      function isPromise(next) {
        if (next.done === true) res();
        else if (next.value.then instanceof Function)
          next.value
            .then(x => isPromise(iterator.next(x)))
            .catch(err => rej(err));
        else isPromise(iterator.next(next.value));
      }
    });
  };
};

const delay = (time, callbackString) => {
  return new Promise(res => {
    setTimeout(() => res(callbackString), time * 1000);
  });
};

Promise.coroutine = coroutine;
Promise.delay = delay;

const f = Promise.coroutine(function* () {
  const str1 = yield Promise.delay(2, 'Hello');
  console.log(str1);
  const str2 = yield Promise.delay(2, 'Hello');
  console.log(str2);
  const str3 = yield Promise.reject(new Error('error'));
  console.log(str3);
});

f().catch(err => console.log(err));
