// API documentation: https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-country-api-queries
// World bank API url example: https://api.worldbank.org/v2/country/br?format=json
let url = "https://api.worldbank.org/v2/country/";

let randomCountryElement = document.querySelector("#random-country");
let userAnswerElement = document.querySelector("#user-answer");
let checkAnswerButton = document.querySelector("#check-answer");
let resultTextElement = document.querySelector("#result");
let playAgainButton = document.querySelector("#play-again");

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file.
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes); // You don't need to log countriesAndCodes - just proving it is available
console.log(
  `There are ${countriesAndCodes.length} countries & codes in the array.`
); // debug

// Creating empty variables
let randomCountryIndex; // a random valid array index
let countryName; // key: "name" from the countriesAndCodes array
let countryCode; // key: "alpha-2" from the countriesAndCodes array
let capital; // key: "capitalCity" from the World Bank API
let userAnswerGuess; // user's answer as entered in the input box

// Select a country randomly from the countriesAndCodes array
randomCountrySelector(); // function call

// When user clicks the check answer button
checkAnswerButton.addEventListener("click", function () {
  fetching(); // fetch function call
});

// TODO finally, connect the play again button.
// Clear the user's answer, select a new random country,
// display the country's name, handle the user's guess.
// If you didn't use functions in the code you've already written,
// you should refactor your code to use functions to avoid writing similar code twice.
playAgainButton.addEventListener("click", function () {
  userAnswerElement.value = "";
  randomCountrySelector(); // callback function
});

// TODO add event listener to click the check answer button first and
//   second click for play again button when the enter key is pressed
window.addEventListener("keyup", function (event) {
  // console.log(`Key: ${event.key}`)    // debug: displays the key value

  // if user presses the enter key
  if (event.key === "Enter") {
    // create an array for active elements
    let inputElements = [userAnswerElement, checkAnswerButton];

    if (inputElements.includes(document.activeElement)) {
      checkAnswerButton.click(); // click check answer button
      playAgainButton.focus(); // shift the focus on the play again button
    }
    // if the play again button is in focus when the enter key was pressed
    else if (document.activeElement === playAgainButton) {
      userAnswerElement.focus(); // shift the focus onto the user input box
    }
  }
});

// All functions here
/**
 * Generates a random valid array index, initializes the some variables; displays
 * the country name and clears the result from the web page.
 */
function randomCountrySelector() {
  // TODO when the page loads, select an element at random from the countriesAndCodes array
  // randomCountryIndex = Math.floor(Math.random() * countriesAndCodes.length)
  randomCountryIndex = ~~(Math.random() * countriesAndCodes.length);
  console.log(`The random array index is: ${randomCountryIndex}`); // debug

  countryName = countriesAndCodes[randomCountryIndex].name;
  countryCode = countriesAndCodes[randomCountryIndex]["alpha-2"];
  console.log(`The country code for ${countryName}: ${countryCode}`); // debug

  // TODO display the country's name in the randomCountryElement placeholder
  randomCountryElement.innerHTML = `${countryName}`;

  // clear any result that is displayed
  resultTextElement.innerHTML = "";
}

// TODO add a click event handler to the submitButton. When the user clicks the button,
//  * read the text from the userAnswerElement
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message.
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer.
//      You can decide how correct you require the user to be. At the minimum, the user's answer
//      should be the same as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong.
//      For example "Correct! The capital of Germany is Berlin" or
//                  "Wrong - the capital of Germany is not G, it is Berlin"
function fetching() {
  // get the user's guess from the input box
  userAnswerGuess = userAnswerElement.value.trim().toLowerCase();

  // fetch parameter with the complete World Bank API url
  fetch(`${url}${countryCode}?format=json`) // fetch returns promise
    .then((res) => {
      // process response into JSON
      // whatever is returned from here goes into worldBankData
      return res.json(); // res.json returns a promise
    })
    .then((worldBankData) => {
      console.log(worldBankData); // debug: displays all API data on web page
      console.log(`Length of api: ${worldBankData.length}`);

      // if there is a country in countriesAndCodes array & it does not exist
      // in the worldBankData, then that place is not a country
      if (worldBankData.length == 1) {
        resultTextElement.innerHTML = `${countryName} is not a country.`;
        console.log(`${countryName} is not a country.`); // debug
        // stop processing else it will go to the 'catch' clause
        return;
      } else {
        capital = worldBankData[1][0].capitalCity;
        console.log(`World Bank API country name: ${worldBankData[1][0].name}`); // debug: checking country name in API
        console.log(`The Capital of ${countryName} is ${capital}`); // debug
      }

      // display appropriate results for the user's answer
      // if the user guesses correctly
      if (userAnswerGuess === capital.toLowerCase()) {
        if (userAnswerGuess === "" && capital === "") {
          console.log(
            `There is no capital for this country. User guess is correct.`
          ); // debug
          resultTextElement.innerHTML = `Correct! ${countryName} does not have a capital.`;
        } else {
          console.log(
            `User guess is correct. ${
              userAnswerGuess === capital.toLowerCase()
            }`
          ); // debug
          resultTextElement.innerHTML = `Correct! The capital of ${countryName} is ${capital}.`;
        }
      }
      // if the user guesses incorrectly
      // if(userAnswerGuess != capital.toLowerCase())
      else {
        // if the user has entered an answer & there is no capital
        if (userAnswerGuess != "" && capital === "") {
          console.log(
            `There is no capital for this country. User guess is incorrect.`
          ); // debug
          resultTextElement.innerHTML = `Wrong! The capital of ${countryName} is not ${userAnswerGuess}.
                                                  ${countryName} does not have a capital.`;
        }
        // if the user has not entered an answer
        else if (userAnswerGuess === "") {
          console.log(`User did not enter an answer.`); // debug
          resultTextElement.innerHTML = `No answer: The capital of ${countryName} is ${capital}.`;
        }
        // if the user's answer does not match the capital
        else {
          console.log(
            `User guess is incorrect. ${
              userAnswerGuess === capital.toLowerCase()
            }`
          ); // debug
          resultTextElement.innerHTML = `Wrong! The capital of ${countryName} is not ${userAnswerGuess}, it is ${capital}.`;
        }
      }

      // if the country name and the capital name is the same
      if (countryName === capital) {
        resultTextElement.innerHTML += `<br><br>This is one of those countries that has the same name for the capital!`;
      }
    })
    .catch((err) => {
      alert("Error: " + err); // alert the user
      console.log("Error", err); // debug
    });
}

// Note 1: The following countries do not have capital cities:
// Example: https://api.worldbank.org/v2/country/hk?format=json
// Hong Kong, Israel, Palestine, Macao

// Note 2: There are many countries in the countriesAndCodes array
// that are not countries, for example:
// Réunion,
