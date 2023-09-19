// API documentation: https://wheretheiss.at/w/developer

// ISS API URL
let url = "https://api.wheretheiss.at/v1/satellites/25544";

// find the iss lat & long paras in the html page
let issLat = document.querySelector("#iss-lat");
let issLong = document.querySelector("#iss-long");

// Leaflet map: '#' not needed here
let map = L.map("iss-mapID").setView([0, 0], 1); // Center map at [0, 0], & max zoom out

// Add the tile layer - roads, streets etc. Without this, nothing to see
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// use the fetch method call to the api url: fetch returns a promise
// res.json also returns a promise & that allows to attach another 'then'
fetch(url)
  .then((res) => {
    return res.json(); // process response into json
  })
  .then((issData) => {
    // process the json
    console.log(issData); // debug: display data in the browser's console

    // get the lat & long values from json properties of issData
    let lat = issData.latitude;
    let long = issData.longitude;

    // display lat & long data on the web page
    issLat.innerHTML = lat;
    issLong.innerHTML = long;

    // create a leaflet marker for the iss location on the world map
    let issMarker = L.marker([lat, long]).addTo(map);
  })
  .catch((err) => {
    console.log("ERROR!", err);
  });

// minimilist way of writing the above code
// fetch(url)
//   .then((res) => res.json()) // 'return' keyword not required
//   .then((issData) => {
//     console.log(issData); // debug
//     let lat = issData.latitude;
//     let long = issData.longitude;
//     issLat.innerHTML = lat;
//     issLong.innerHTML = long;
//     let issMarker = L.marker([lat, long]).addTo(map);
//   })
//   .catch((err) => console.log("ERROR", err));
