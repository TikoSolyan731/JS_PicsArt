function mapSeries(values, mapper) {
	const arr = [];
	return values
		.reduce((acc, value) => {
			return acc.then(() => {
				return Promise.resolve(value).then((res) => {
					return Promise.resolve(mapper(res)).then((mapped) => {
						arr.push(mapped);
					});
				});
			});
		}, Promise.resolve())
		.then(() => arr);
}

Promise.mapSeries = mapSeries;

const strings = [
	new Promise((res, r) => setTimeout(() => r('timed out'), 2000)),
	new Promise((res) => setTimeout(() => res('timed out'), 2000)),
	'simple string',
	Promise.resolve('resolved'),
	Promise.reject('Rejected'),
	Promise.reject('Rejected2'),
];

Promise.mapSeries(strings, (string, i) => {
	let newStr = string.toUpperCase();
	return newStr;
})
	.then((results) => {
		console.log(results);
	})
	.catch((err) => console.error(err));