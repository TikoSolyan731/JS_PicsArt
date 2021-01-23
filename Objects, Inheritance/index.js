'use strict';

let person = {
    name: "Tigran",
    age: 18,
    0.5: "Hi",
    friends: ["Hayk", "Armen"],

    loop: function () {
        this.friends.forEach(function (name) {
            console.log(this.name + " knows " + name);
        }, this);
    },

    sayHello: function () {
        console.log("Hello, my name is " + this.name + ". I am " + this.age);
    }
};

console.log(person.name);
console.log(person.age);
console.log(person["0.5"]);
person["say" + "Hello"]();

//delete person.age;

console.log(Object.keys(person));
console.log(Object.values(person));

let isTrue = new Boolean(true);
console.log(isTrue.valueOf());

function returnThis() {
    return this;
}

let jane = {
    name: "Jane",

    sayHelloTo: function (otherName) {
        "use strict";
        console.log(this.name + " says hello to " + otherName);
    }
};

jane.sayHelloTo("Arman");
jane.sayHelloTo.call(person, "Arman");
jane.sayHelloTo.apply(jane, ["Tarzan"]);

function testBind() {
    console.log("this: " + this);
    console.log("arguments: " + Array.prototype.slice.call(arguments));
}

let bound = testBind.bind(jane);

bound();

let date = new (Date.bind(null, 2020, 11, 12))();

console.log(date);

let counter = {
    count: 0,
    inc: function () {
        this.count++;
        return this;
    }
};

counter.inc().inc().inc();
console.log(counter.count);

let increment = counter.inc.bind(counter);
increment();
console.log(counter.count);

setTimeout(increment, 1000);

person.loop();
let student = Object.create(person, {
    gpa: {value: 4, writable: true, enumerable: true}
});

console.log(student.name);
console.log(student.gpa);
student.loop();

console.log(Object.getPrototypeOf(student) === person);
console.log(person.isPrototypeOf(student));

function getDefiningObject(obj, propKey) {
    obj = Object(obj);

    while (obj && !obj.hasOwnProperty(propKey)) {
        obj = Object.getPrototypeOf(obj);
    }

    return obj;
}

console.log(getDefiningObject(student, "name") === person);

console.log(student.__proto__);

console.log(student.hasOwnProperty("gpa"));
console.log(Object.getOwnPropertyNames(student));

for (const key in student) {
    if ({}.hasOwnProperty.call(student, key))
        console.log(key);
}

console.log('\n');

Object.defineProperties(student, {
    classCount: {value: 5, enumerable: true},
    gender: {value: 'm', enumerable: false}
});

console.log({}.hasOwnProperty.call(student, "name"));


let obj = {
    get foo() {
        return "foo";
    },

    set foo(value) {
        console.log("foo: " + value);
    }
}

console.log(Object.getOwnPropertyDescriptor(obj, "foo"));

console.log(obj.foo);

Object.defineProperty(student, "university", {
    value: "AUA",
    writable: true,
    enumerable: true,
    configurable: false
});

student.university = "ASUE";

console.log(Object.keys(student));
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "toString"));

Object.freeze(obj);

console.log(Object.getOwnPropertyDescriptor(obj, "foo"));
//Object.setPrototypeOf(obj, student);


function Person(name) {
    this.name = name;
}

Person.prototype.describe = function() {
    console.log('Person is named ' + this.name);
}

let p = new Person('hayk');

p.describe();
console.log(Person.prototype.constructor === Person);
console.log(p.__proto__);
console.log(p.constructor.name);

Object.getPrototypeOf(p);

function Container(name) {
    this.name = name;
    let secret = 5;
    let that = this;
    
    function showSecret() {
        if (secret)
            console.log(secret);
    }

    this.reveal = function() {
        showSecret();
    }
}

Container.prototype.sayHello = function() {
    console.log(this.name);
}

let cont = new Container("Hello");

child.x = 2;

console.log(cont.name);
console.log(child.reveal());
cont.reveal();
cont.sayHello();