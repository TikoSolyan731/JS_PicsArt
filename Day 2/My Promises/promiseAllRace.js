const all = array => {
	return new Promise((resolve, reject) => {
		const results = [];
		let completedCount = 0;

		array.forEach((item, i) => {
			Promise.resolve(item)
				.then(res => {
					results[i] = res;

					completedCount += 1;

					if (completedCount === array.length) resolve(results);
				})
				.catch(err => reject(err));
		});
	});
};

const race = array => {
	return new Promise((resolve, reject) => {
		array.forEach(item => {
			Promise.resolve(item)
				.then(res => resolve(res))
				.catch(err => reject(err));
		});
	});
};

Promise.all = all;
Promise.race = race;

const a = [
	new Promise(resolve => setTimeout(() => resolve(20), 4000)),
	new Promise(resolve => setTimeout(() => resolve(20), 2000)),
	Promise.reject('error'),
];

Promise.all(a).then(values => console.log(values));
Promise.race(a)
	.then(res => console.log(res))
	.catch(err => console.error(err));
