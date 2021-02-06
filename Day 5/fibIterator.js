const fibIterator = {};

fibIterator[Symbol.iterator] = () => {
  const fibNumbers = [0, 1];
  let i = 0;

  return {
    next: () => {
      if (i >= 2) {
        fibNumbers[i] = fibNumbers[i - 1] + fibNumbers[i - 2];
      }

      return {
        value: fibNumbers[i++],
        done: false,
      };
    },
  };
};

let index = 0;
for (const n of fibIterator) {
  if (index++ >= 50) break;

  console.log(n);
}

// let iter = fibIterator[Symbol.iterator]();

// console.log(iter.next());