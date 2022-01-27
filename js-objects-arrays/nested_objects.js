
// Create an object. Values can be strings, numbers, lists, other objects
let user = {
    username: 'Zoe',
    password: 'kittens',
    userid: 1,
    roles: ['user', 'admin'],       // roles value is an array
    contact: {                      // contact value is another object by itself
        phone: '123-456-7890',
        office: 'T.1400',
    },
}
console.log(user)


user.userid = 101                   // Change userid 
console.log(user)


console.log('\nUser roles are: ', user.roles)           // Print roles array
console.log('User roles are: ', user['roles'])          // Print roles array, other syntax
console.log('Users first role is ' + user.roles[0])     // First role 

// All of the user's roles
console.log('\nAll the user roles are: ')
user.roles.forEach(function(role) {
    console.log(role)
})


// Access nested values 
console.log('\nOld office is ' + user.contact.office)
user.contact.office = 'M.1234'      // Change office
console.log('New office is ' + user.contact.office)

console.log('User phone number is ' + user.contact.phone)


// Add another attribute - even though it's not defined in our object
user.email = 'zoe@minneapolis.edu'


// Nested objects display as [object Object]
console.log('\nFull user info: ' + user)


// Print all of the data on one line
console.log('\nFull user info: ' + JSON.stringify(user))

// On multiple lines with 2 spaces of indentation
console.log('\nFull user info\n' + JSON.stringify(user, null, 2))


