// API documentation: https://exchangerate.host/#/#docs
let url = "https://api.exchangerate.host/latest?base=USD"


// find the below elements on the document
let dollarInputEl = document.querySelector('#dollars')
let targetCurrencySelect = document.querySelector('#target-currency')
let convertButton = document.querySelector('#convert')
let resultDisplay = document.querySelector('#result')

let allRates    // will initialize with API response later

convertButton.disabled = true   // no conversion until ready 

fetching()                      // initial call to function

// todo challenge - create a setInterval to make a new request every 20 minutes? 
// make request to get all the data first
let updateTime = 1200000        // 1200000 ms = 20 minutes
setInterval(fetching, updateTime)    // call the iss function every updateTime seconds

function fetching() {
    // use the fetch method call to the api url: fetch returns a promise
    // res.json also returns a promise & that allows to attach another 'then'
    fetch(url)
    // .then( response => response.json())
    .then((response) => {
        // response is all the things from the server
        console.log(response)       // debug: there's a lot of other items as well as the JSON
        
        // extract JSON: convert to javascript objects, array, whatever it is
        let jsonPromise = response.json()
        console.log(jsonPromise)    // debug
        
        return jsonPromise          // whatever this resolves into...
    })
    .then(function (data) {         //  ... ends up here
        console.log('JSON data: ', data)        // debug: just the JSON
        
        // e.g. {AED: 3.673737, AFN: 96.265199, ALL: 107.163584, AMD: 487.763312, ANG: 1.799208, …}
        allRates = data.rates                   // an object
        console.log('All rates: ', Object.keys(allRates).length, allRates)  // debug

        makeCurrencyOptions(allRates)   // build options from rates data 
        
        convertButton.disabled = false  // enable convert button
        
        // create event listener 
        convertButton.addEventListener('click', function () {
            convert()
        })
    })
    .catch(error => {
        console.log(error)
        alert('Sorry, unable to do conversion')
    })
}



/**
 * Creates the select option dropdown list for various currency options.
 * @param {Object} rates 
 */
function makeCurrencyOptions(rates) {
    // clear any existing options
    // targetCurrencySelect.innerHTML = ''

    // Create one option element for each currency name in rates
    for (currency in rates) {
        option = document.createElement('option')
        option.value = currency
        option.innerHTML = currency
        targetCurrencySelect.appendChild(option)
    }
}

function convert() {
    // how many dollars?  
    let dollarsUS = dollarInputEl.value             // todo validation
    // what currency?
    let currency = targetCurrencySelect['value']    // todo validation
    console.log(dollarsUS, currency)				// debug

    // Form validation: check if valid values are entered & selected
    validateForm(dollarsUS, currency)

    // object - the key is a variable, use []
    // get the value of the selected currency
    let conversion = allRates[currency]
    console.log('Converting to: ', currency, conversion);

    let result = conversion * dollarsUS             // calculate
    result = result.toFixed(3)                      // 3 decimal places
    
    // display result
    if (dollarsUS == 1) {
        resultDisplay.innerHTML = `${dollarsUS} US Dollar is ${result} ${currency}`
    }
    else {
        resultDisplay.innerHTML = `${dollarsUS} US Dollars is ${result} ${currency}`
    }
}


function validateForm(dollars, currency) {
    let errors = []     // empty array to store form errors

    // Form validation 1: input box
    // check if dollarsUS is less than or equal to zero or an ''
    if (dollars <= 0 || dollars == '') {
        errors.push(`Entered ${dollars}: Please enter 1 or greater.`)
    }

    // Form validation 2: dropdown list
    // check if a valid selection is made from the dropdown list
    if (currency == 'none') {
        errors.push(`Selected ${currency}: Please select a valid target currency.`)
    }

    // if there are errors then: display an alert with all error messages (use join)
    // and then return from this function to prevent further processing
    if (errors.length > 0) {
        alert(errors.join('\n'))    // display each error in a new line
        return                      // stop processing
    }
}