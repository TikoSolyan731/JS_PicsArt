// setTimeout(() => console.log("Timed out"), 2000);

// process.nextTick(() => console.log("Next Tick"));

// console.log("After Tick");

// function main() {
// 	setTimeout(() => console.log("SetTimeout"), 0);
// 	setImmediate(() => console.log("SetImmediate"));
// }

// main();

// function func() {
// 	require("fs").readFile("text.txt", () => {
// 		console.log();
// 		setTimeout(() => console.log("SetTimeout"), 0);
// 		setImmediate(() => console.log("SetImmediate"));
// 	});
// }

// func();

// function func2() {
// 	setTimeout(() => console.log("1"), 50);
// 	process.nextTick(() => console.log("2"));
// 	setImmediate(() => console.log("3"));
// 	process.nextTick(() => console.log("4"));
// }

// func2();

// let arr = [1, 2, 3];

// let sum = arr.reduce((acc, current) => {
// 	return acc + current;
// }, 10);

// console.log(sum);

const promises = [
	Promise.resolve('Resolved'),
	Promise.reject('Rejection'),
	Promise.resolve('Resolved 2'),
];

// function func(promises) {
// 	const results = [];

// 	const reduced = promises.reduce((acc, value) => {
// 		return acc.then(() => {
// 			return Promise.resolve(value)
// 				.then((result) => {
// 					results.push(result);
// 					return Promise.resolve();
// 				})
// 				.catch((error) => {
// 					return Promise.reject(new Error(error));
// 				});
// 		});
// 	}, Promise.resolve());

// 	return reduced.then(() => results);
// }

// func(promises)
// 	.then((results) => console.log(results))
// 	.catch((error) => console.error(error));

// const prom = new Promise((res) => {
// 	setTimeout(() => res(50), 2000);
// });

// Promise.resolve().then(() => {
// 	return prom;
// }).then();
