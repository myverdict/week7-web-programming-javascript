// Function vs Class in JavaScript: https://www.youtube.com/watch?v=6UUY8YrkkZQ

// Classes are functions

// Like a constructor
let User = function(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
};

console.log(User);          // [Function: User]
console.log(User.name);     // User
console.log(typeof User);   // function
console.log();


// To add features, methods - to the User class, add them to the User prototype
// Method 1:  creating a new method 'setUserId'
User.prototype.setUserId = function(newId) {    // Add a function
    if (newId > 0) {
        this.userid = newId;
    } 
    else {
        console.log(newId + " is invalid, must be a positive number");
    }
};


// Method 2: create another method to display 'fullName'
// Add another method - this one returns the user's full name, build from first + last
User.prototype.fullName = function() {
    return this.firstname + " " + this.lastname;
}


// Property 1: Add a property - applies to all 'User' objects
User.prototype.organization = "MCTC";


// Implementing the methods & properties above
let me = new User("Sam", "Gilly");      // Create a User
me.setUserId(4);                        // Call function of the User class prototype

console.log(me.firstname + " " + me.lastname + " " + me.userid + " " + me.organization);
console.log("My full name: " + me.fullName() + '\n');


let you = new User("North", "Peters");  // Create another user
you.setUserId(10);                      // Set userid ; this does not change the other User(s)

console.log(you.firstname + " " + you.lastname + " " + you.userid + " " + you.organization);
console.log("Your full name: " + you.fullName());

