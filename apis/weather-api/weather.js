// The weather forecast office abbreviations for CWA (County warning area)
// {office} --> For e.g.: MPX
// https://www.census.gov/topics/preparedness/related-sites/nws.html
// https://en.wikipedia.org/wiki/List_of_National_Weather_Service_Weather_Forecast_Offices

// The grids
// {grid X},{grid Y} --> For e.g.: 116,72

// https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast
let url = "https://api.weather.gov/gridpoints/MPX/116,72/forecast";

// get the table id from the document
let weatherTable = document.querySelector("#weather-forecast");

fetch(url)
  .then((res) => res.json())
  .then((weatherJson) => {
    displayWeatherTable(weatherJson); // call a function to keep this code clearer
  })
  .catch((error) => {
    console.log("Error: ", error); // details in console for developer
    alert("Sorry, could not fetch the weather forecast"); // generic error to user
  });

function displayWeatherTable(weatherJson) {
  console.log(weatherJson); // debug

  // an array of forecasts
  let forecasts = weatherJson.properties.periods;
  console.log(forecasts); // debug

  forecasts.forEach((forecast) => {
    let day = forecast.name;
    let temp = forecast.temperature;
    let detail = forecast.detailedForecast;
    let weatherIconUrl = forecast.icon;

    // create a new table row
    let tableRow = document.createElement("tr");

    // Table Cell 1: create a new table cell for day & add to the table row
    let dayTableCell = document.createElement("td");
    dayTableCell.innerHTML = day;

    // Table Cell 2: create a new table cell for temperature & add to table row
    let tempTableCell = document.createElement("td");
    tempTableCell.innerHTML = temp;

    // create a new image element
    let weatherImage = document.createElement("img");
    weatherImage.src = weatherIconUrl; // add image source to the image

    // Table Cell 3: create a new table cell for image
    let weatherImageTableCell = document.createElement("td");
    weatherImageTableCell.appendChild(weatherImage); // Add image to table cell

    // Table Cell 4: create a new table cell for detailed forecast & add to table row
    let detailTableCell = document.createElement("td");
    detailTableCell.innerHTML = detail;

    // add table cells individually to each tableRow using appendChild
    // tableRow.appendChild(dayTableCell)
    // tableRow.appendChild(tempTableCell)
    // tableRow.appendChild(weatherImageTableCell)
    // tableRow.appendChild(detailTableCell)

    // Or add all at once using 'append' multiple children to an element
    tableRow.append(
      dayTableCell,
      tempTableCell,
      weatherImageTableCell,
      detailTableCell
    );

    // append row to table
    weatherTable.appendChild(tableRow);
  });
}
