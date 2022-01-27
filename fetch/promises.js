let url = 'https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes'

// Imaginary fetch function, getting and processing data from an API, with callbacks
/*
    // Pseudo code
    fetch(url, function(error, response) {
        if (error) {
            console.log('Oh no! error fetching data!', error)
        } else {
            processResponse(response, function(error, data) {
                if (error) {
                    console.log('Oh dear! Error processing response', error)
                } else {
                    // do something with data 
                }
            })
        }
    })
    // Don't write this code, it won't work :) 
*/

// fetch - uses promises instead of callbacks functions - this only works in a browser
fetch(url)
    .then((response) => {
        // Response contains JSON, but as a string 
        console.log(response)
        // Convert JSON from response into object
        // response.json() returns a promise
        // The result of the promise is handled in the
        // next then() block when the promise resolves
        return response.json()
    }).then((data) => {
        // data is a JavaScript object 
        // It's the resolved result of response.json()
        console.log(data)
        // do something with data here 
    }).catch((error) => {
        // If an error occurs, a promise is rejected
        // In this case, the catch runs 
        // deal with errors here 
        console.log('error!', error)
    })


// Simplified fetch version - if you've got a Promise that receives 
// only one parameter you can omit the () parentheses around parameter 
// If the function has a one-line statement that returns data, you 
// can omit the { } and the keyword 'return', and whatever the statement
// evaluates to will be returned and passed to the next then()

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         // data is a JavaScript object
//         console.log(data)
//         // do something with data here 
//     }).catch(error => {
//         // deal with errors here 
//         console.log('error!', error)
//     })


