// API documentation: https://exchangerate.host/#/#docs
let url = "https://api.exchangerate.host/latest?base=USD";

// find the below elements on the document
let dollarInputEl = document.querySelector("#dollars");
let targetCurrencySelect = document.querySelector("#target-currency");
let convertButton = document.querySelector("#convert");
let resultDisplay = document.querySelector("#result");

convertButton.addEventListener("click", function () {
  let errors = []; // empty array to store form errors

  // how many dollars entered?
  let dollarsUS = dollarInputEl.value; // todo validation
  // what currency to be converted to?
  let currency = targetCurrencySelect.value; // todo validation

  console.log(dollarsUS, currency);

  // Form validation 1: input box
  // check if dollarsUS is less than or equal to zero or an ''
  if (dollarsUS <= 0 || dollarsUS == "") {
    errors.push(`Entered ${dollarsUS}: Please enter 1 or greater.`);
  }

  // Form validation 2: dropdown list
  // check if a valid selection is made from the dropdown list
  if (currency == "none") {
    errors.push(`Selected ${currency}: Please select a valid target currency.`);
  }

  // if there are errors then: display an alert with all error messages (use join)
  // and then return from this function to prevent further processing
  if (errors.length > 0) {
    alert(errors.join("\n")); // display each error in a new line
    return; // stop processing
  }

  fetch(url)
    .then((response) => {
      // response is all the things from the server
      console.log(response); // debug: optional

      // extract JSON: converts to javascript objects, array, whatever it is
      let JSONPromise = response.json();

      return JSONPromise; // whatever this promise resolves into...
    })
    .then(function (data) {
      //  ... ends up here
      console.log(data); // debug

      // can you figure out the conversion?
      // {"CAD":1.563,"HKD":9.1412,"ISK":162.8,"PHP":57.137,"DKK":7.4408,"HUF":359.72,"CZK":27.035,"AUD":1.6472,"RON":4.876,"S...}
      let allRates = data.rates;
      console.log(allRates); // debug

      // currency is CAD, HDK, or ISK
      let conversion = allRates[currency];

      let result = dollarsUS * conversion; // conversion math
      result = result.toFixed(3); // result fixed to 3 decimals

      // display the result
      if (dollarsUS == 1) {
        resultDisplay.innerHTML = `${dollarsUS} US Dollar is ${result} ${currency}`;
      } else {
        resultDisplay.innerHTML = `${dollarsUS} US Dollars is ${result} ${currency}`;
      }
    })
    .catch((error) => {
      alert("Sorry, unable to do conversion");
      console.log(error);
    });
});
