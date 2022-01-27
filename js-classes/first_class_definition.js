
// Constructor: Acts as our class definition - define a constructor
let Squirrel = function(squirrelName) {
    this.name = squirrelName;
    this.nuts = 0;
};

// Method 1: Add a method to the Squirrel class using 'prototype'
Squirrel.prototype.sayHello = function() {
    console.log("Hello!");
};

// Method 2: Add another method
Squirrel.prototype.favFood = function() {
    console.log(this.name + " likes nuts");
};

// Method 3: And another method
Squirrel.prototype.addNutsToStore = function(newNuts) {
    this.nuts += newNuts;
};


// IMPLEMENTATION OF THE ABOVE CONSTRUCTOR & METHODS
// Create a new Squirrel instance
let fluffy = new Squirrel("Fluffy");    // Calls the constructor

// Call some squirrel methods for fluffy
fluffy.sayHello();
fluffy.addNutsToStore(10);
fluffy.favFood();
fluffy.addNutsToStore(15);

console.log(fluffy.nuts);


// Create a new Squirrel instance
let squeaky = new Squirrel("Squeaky");

// Call some squirrel methods for squeaky
squeaky.sayHello();
squeaky.favFood();
// Can you call addNutsToStore for this Squirrel?
squeaky.addNutsToStore(7)
console.log(squeaky.nuts)

// Property: Adding new properties to one Squirrel only
squeaky.tree = "Oak Tree";
console.log("Squeaky's tree is : " + squeaky.tree);     // "Oak Tree"

// Fluffy doesn't have a tree
console.log("Fluffy's tree is : " + fluffy.tree);       // "undefined"


// Method 4: Add a new jump method only for fluffy
fluffy.jump = function() {
    console.log(this.name + " is jumping!");
};

fluffy.jump();   // This works

// Calling this results in an error - squeaky doesn't have a jump method
// squeaky.jump();     // TypeError: squeaky.jump is not a function

