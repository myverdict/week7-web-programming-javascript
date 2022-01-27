
// API documentation: https://sunrise-sunset.org/api

// See MDN Web docs for examples
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#examples

// requests permission to use device location
// check if geolocation is supported by the browser
if (!navigator.geolocation) {
    // if geolocation is NOT supported by the browser
    console.log('Geolocation is not supported by your browser');
}
else {
    // if geolocation is supported by the browser, run the getCurrentPosition() method
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    // for debugging purposes: checking if error code 3 is executed
    // navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {timeout:0});
}





/**
 * This function get the coordinates for the device location which is used by the 
 * sunrise-sunset api to get sunrise-sunset timings for the device location using
 * fetch(). Converts the retrieved results from UTC, the time in London, to the 
 * browser's local timezone.
 * 
 * @param {Object} position GeolocationPosition object
 */
function successCallback(position) {
    console.log('GeolocationPosition object below: ')   // debug
    console.log(position)                               // debug

    let lat = position.coords.latitude
    let lng = position.coords.longitude
    console.log(`Latitude: ${lat}, Longitude: ${lng}`)  // debug

    // note the backticks in the format string 
    let url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`

    fetch(url)
        .then(res => {
            return res.json()   // convert response into a JSON object
        })
        .then(json => {
            console.log('JSON data below: ')    // debug
            console.log(json)                   // debug

            // find the span elements on the document webpage
            let todayEl = document.querySelector('#today')
            let sunriseEl = document.querySelector('#sunrise')
            let sunsetEl = document.querySelector('#sunset')

            // get the json data for sunrise & sunset
            let sunriseTime = json.results.sunrise
            let sunsetTime = json.results.sunset

            // Convert from UTC - the time in London - to the browser's local time 
            let tz = Intl.DateTimeFormat().resolvedOptions().timeZone   // browser's timezone

            let todayDate = new Date()
            // Make new date objects from the strings sunriseTime & sunsetTime
            let sunriseDate = new Date(sunriseTime)
            let sunsetDate = new Date(sunsetTime)

            // And format it as a local time (omitting the day month year) in the browser's timezone
            // format to the browser's timezone
            let localDate = todayDate.toLocaleString({ timezone: tz })
            let localizedSunriseDate = sunriseDate.toLocaleTimeString({ timezone: tz })  
            let localizedSunsetDate = sunsetDate.toLocaleTimeString({ timezone: tz })

            // And set as HTML for the #today #sunrise and #sunset id elements. 
            todayEl.innerHTML = localDate
            sunriseEl.innerHTML = localizedSunriseDate
            sunsetEl.innerHTML = localizedSunsetDate
        })
        .catch(err => {
            console.log(err)
        })
}



/**
 * For GeolocationPositionError:
 * On chrome: user clicks 'block' when the browser asks:
 *    This file wants to know your location: Allow/Block
 * On firefox: user clicks 'block' when the browser asks:
 *    Allow this file to access your location? Allow/Block
 * Or when there is poor/no internet connection, after user clicks allow.
 * See https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
 */
function errorCallback(error) {
    console.log(error);     // debug

    // PERMISSION_DENIED: when user blocks the browser permission access question
    // Error message: user denied geolocation
    if (error.code == 1) {
        console.log("ERROR Code 1: ", error.message) 
    }
    // POSITION_UNAVAILABLE: when internet connection fails
    // Error message: Network location provider at 'https://www.googleapis.com/' : ERR_NAME_NOT_RESOLVED.
    else if (error.code == 2) {
        console.log("ERROR Code 2: ", error.message)
    }
    // TIMEOUT
    // Error message: Timeout Expired
    else if (error.code == 3) {
        console.log("ERROR Code 3: ", error.message)
    }
}




