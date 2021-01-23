"use strict";

// function test() {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			try {
// 				const rand = Math.random();
// 				const succeed = rand < 0.8;
// 				if (succeed) {
// 					console.log("Resolving with 42");
// 					resolve(rand.toFixed(2));
// 				} else {
// 					console.log("Rejecting with error");
// 					throw new Error("Error");
// 				}
// 			} catch (e) {
// 				reject(e);
// 			}
// 		}, 1000);
// 	});
// }

// let arr = [];

// test()
// 	.then((value) => {
// 		arr.push(value);

// 		return test();
// 	})
// 	.then((value) => {
// 		arr.push(value);

// 		return arr;
// 	})
// 	.then((arr) => console.log(arr))
// 	.catch((error) => console.log("Rejected with " + error))
// 	.finally(() => console.log("finally"));

// Promise.all([
// 	new Promise((res) => setTimeout(() => res(10), 1000)),
// 	"simple string",
// 	Promise.resolve({ name: "Tigran" }),
// ])
// 	.then(([firstRes, secondRes, thirdRes]) => {
// 		console.log("First: " + firstRes);
// 		console.log("Second: " + secondRes);
// 		console.log("Third: " + thirdRes.name);
// 	})
// 	.catch((err) => console.error(err));

// Promise.race([
// 	new Promise((res) => setTimeout(() => res(10), 500)),
// 	"simple string",
// ])
// 	.then((data) => console.log(data))
// 	.catch((err) => console.error(err));

//console.log(arr);

// async function mapSeries(values, callback) {
// 	let results = [];

// 	for (let i = 0; i < values.length; i++) {
// 		let current = values[i];
// 		if (current instanceof Promise) {
// 			try {
// 				let result = await current;
// 				let callRes = await callback(result, i);
// 			} catch (e) {
// 				throw new Error(e);
// 			}

// 			results.push(callRes);
// 		} else {
// 			let res = callback(current, i);

// 			if (res instanceof Promise) {
// 				try {
// 					let mappedRes = await res;
// 				} catch (e) {
// 					throw new Error(e);
// 				}

// 				continue;
// 			}
// 			results.push(res);
// 		}
// 	}

// 	//console.log(results);
// 	return Promise.resolve(results);
// }

// Promise.mapSeries = mapSeries;

// const values = [
// 	"hello",
// 	"bye",
// 	new Promise((res, rej) => {
// 		setTimeout(() => res("string"), 4000);
// 	}),
// ];

// Promise.mapSeries(values, (value, index) => {
// 	return value.toUpperCase() + " " + index;
// })
// 	.then((results) => {
// 		console.log(results);
// 	})
// 	.catch((err) => console.log("Some Error - " + err));

Promise.all = recursiveAll;

function recursiveAll(values) {
	if (values.length == 0) return Promise.resolve([]);

	let [first, ...rest] = values;

	return Promise.resolve(first).then((firstRes) => {
		return recursiveAll(rest).then((restRes) => {
			return [firstRes, ...restRes];
		});
	});
}

let arrayOfThenables = [
	new Promise((res) => setTimeout(() => res(10), 2000)),
	45,
	"simple string",
	Promise.reject("Error"),
];

// Promise.all(arrayOfThenables)
// 	.then((results) => console.log(results))
// 	.catch((error) => console.error(error));

Promise.all = iterableAll;

function iterableAll(values) {
	return new Promise((resolve, reject) => {
		let results = [];
		let completed = 0;

		values.forEach((value, index) => {
			Promise.resolve(value)
				.then((res) => {
					results[index] = res;
					completed += 1;

					if (completed == values.length) resolve(results);
				})
				.catch((error) => reject(error));
		});
	});
}

// Promise.all(arrayOfThenables)
// 	.then((results) => console.log(results))
// 	.catch((error) => console.error(error));

Promise.all = reductionAll;

function reductionAll(values) {
	return values.reduce((accumulator, value) => {
		return accumulator.then((results) => {
			return Promise.resolve(value).then((result) => {
				return [...results, result];
			});
		});
	}, Promise.resolve([]));
}

Promise.all(arrayOfThenables)
	.then((results) => console.log(results))
	.catch((error) => console.error(error));
