function* fibGen() {
  const fib = [0, 1];

  for (let i = 0; i < Infinity; i++) {
    if (i < 2) {
      yield fib[i];
      continue;
    }

    fib[i] = fib[i - 1] + fib[i - 2];
    yield fib[i];
  }
}

let index = 0;
for (const n of fibGen()) {
  if (index++ >= 50) break;

  console.log(n);
}
