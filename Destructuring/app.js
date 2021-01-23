'use strict';

// let object = {first: 1, second: 2};

// let {first, second} = getObject();

// console.log(first, second);

// function getObject() {
//     return object;
// }

// const arr = ["One", "Two", "Three", "Four", "Five"];

// // [first, second, third = "Three"] = arr;

// // console.log(first, second, third);

// let [one, two, ...rest] = arr;

// console.log(one, two);
// console.log(rest);

const o = {a: [1, 2, 3], b: {inner1: 5, inner2: 4}, toString: () => "O is O"};

let {a: [one, two, three], b: {inner1}} = o;

console.log(one, two, three);
console.log(inner1);

let {toString} = o;

console.log(toString());

const array = [
    {name: "one", value: 1},
    {name: "two", value: 2},
    {name: "three", value: 3},
];

for (const {name, value} of array) {
    console.log("name: " + name + ", value: " + value);
}