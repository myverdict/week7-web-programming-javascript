/*
  A function that is passed to another function as a parameter is a callback function.
  Function callbacks and arrow notation. All of the forEach calls are identical.
*/

let animals = ["Bird", "Whale", "Zebra"];

// Using a callback function - 1 argument
animals.forEach(function (animal) {
  console.log(animal);
});
console.log("--------------");

// Using a callback function - 2 arguments
animals.forEach(function (animal, index) {
  console.log(animal, index);
});
console.log("--------------");

// Using a callback function, written in arrow notation
// This is equivalent to the code above, but is more concise
animals.forEach((animal) => {
  console.log(animal);
});
console.log("--------------");

animals.forEach((animal, index) => {
  console.log(animal, index);
});
console.log("--------------");

// If there is only one parameter to the callback function, can omit the parentheses
animals.forEach((animal) => {
  console.log(animal);
});
console.log("--------------");

// If there's only one statement in the callback function, can omit the { }
animals.forEach((animal) => console.log(animal));
console.log("--------------");

animals.forEach((animal, index) => console.log(animal, index));
console.log("--------------");

// If there is only one parameter to the callback function,
// and one statement in the callback function, can omit the () and { }
animals.forEach((animal) => console.log(animal));
console.log("--------------");

// Or can be even more concise and write on one line. This only works
// for a single line in the callback function
animals.forEach((animal) => console.log(animal));
console.log("--------------");

animals.forEach((animal, index) => console.log(animal, index));
console.log("--------------");
