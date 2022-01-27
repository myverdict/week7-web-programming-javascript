// Project from: https://www.youtube.com/watch?v=J-lUOFXxG_0
// By CodingNepal

// API documentation: https://opencagedata.com/api#quickstart
// using Geocoding API to get location details: www.opencagedata.com
// https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY
let apiKey = '41f0945eac5f4ff8a31e8563fcdbe43f';

// sending get request to the api by passing the lat & long coordinates of the user's device position
let url = `https://api.opencagedata.com/geocode/v1/json?q=`;


// find the button element on the web page
let buttonEl = document.querySelector('button');

// add an event listener to the button
buttonEl.addEventListener('click', () => {
    console.log(navigator.geolocation);     // debug

    // if browser supports geolocation api
    if (navigator.geolocation) {
        buttonEl.innerHTML = 'Allow to detect location';
        // then ask user for permission to get device location
        // geolocation.getCurrentPosition() method is used to get current position of the device
        // it takes 3 parameters, success, error, & options.
        // if everything is right then success callback fn will be called.
        // else error callback fn will be called.
        // 3rd parameter is optional & not required for this project.
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        buttonEl.innerHTML = 'Browser does not support geolocation.';
    }
});

function onSuccess(position) {
    console.log(position);  // debug
    buttonEl.innerHTML = 'Detecting your location...'
    let { latitude, longitude } = position.coords;

    console.log(latitude, longitude);   // debug

    fetch(`${url}${latitude}+${longitude}&key=${apiKey}`)
        // parsing json data into javascript and returning it.
        .then(res => {
            return res.json();          // process response into json
        })
        // process the json: and then receiving the object that is sent by the api
        .then(apiData => {
            console.log(apiData);       // debug: display data in the browser's console

            // pass components object to allDetails variable
            let allDetails = apiData.results[0].components;
            console.table(allDetails);  // debug

            // get the below details from the allDetails object
            let {county, postcode, country} = allDetails;

            console.log(county, postcode, country);     // debug

            buttonEl.innerHTML = `${county} ${postcode}, ${country}`;
        })
        .catch(err => {
            console.log('ERROR!', err)
        })
}

// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
function onError(error) {
    console.log(error);     // debug

    if (error.code == 1) {
        buttonEl.innerHTML = 'You denied the request';
    }
    else if (error.code == 2) {
        buttonEl.innerHTML = 'Location not available';
    }
    else {
        buttonEl.innerHTML = 'Something went wrong';
    }

    buttonEl.disabled = true;
}