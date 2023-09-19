// API documentation: https://wheretheiss.at/w/developer

// ISS API URL
let url = "https://api.wheretheiss.at/v1/satellites/25544";

// find the iss lat & long paras in the html page
let issLat = document.querySelector("#iss-lat");
let issLong = document.querySelector("#iss-long");
let timeIssLocationFetched = document.querySelector("#time");

let issMarker; // Leaflet marker
let issIcon = L.icon({
  iconUrl: "iss_icon.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});
let updateTime = 10000; // 10000 ms = 10 seconds
let maxFailedAttempts = 3;

// Leaflet map: '#' not needed here
let map = L.map("iss-mapID").setView([0, 0], 1); // Center map at [0, 0], & max zoom out

// Add the tile layer - roads, streets etc. Without this, nothing to see
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// initial call to function
// once the fetch request has been made, the iss function will call itself again, after a delay
// of updateTime milliseconds, if the max number of failed attempts is not exceeded.
iss(maxFailedAttempts);
// use setTimeout instead - better approach
// setInterval(iss, updateTime)    // call the iss function every updateTime seconds

function iss(attempts) {
  if (attempts <= 0) {
    alert("Failed to contact ISS server after several attempts.");
    // Since setTimeout is not called again, no more attempts to fetch will be made
    return; // stop processing
  }

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

      // create or move the leaflet marker
      if (!issMarker) {
        // create a leaflet marker if it does not exist
        issMarker = L.marker([lat, long], { icon: issIcon }).addTo(map);
      } else {
        // move the leaflet marker if marker already exists
        issMarker.setLatLng([lat, long]);
      }

      // Time ISS location was fetched
      let now = Date(); // create a new Date object
      timeIssLocationFetched.innerHTML = `At ${now}, the ISS is over the below coordinates.`;
    })
    .catch((err) => {
      attempts--; // decrement the maxFailedAttempts
      console.log("ERROR!", err);
    })
    .finally(() => {
      // finally runs whether the fetch() worked or failed.
      // Call the iss function after a delay of updateTime milliseconds to update the position
      // updates every 10 seconds after the last request was successfully completed
      // or if the last request erred, so it is waiting after the last request is done
      // and processed
      // list out the parameters to the iss function after the period of time
      setTimeout(iss, updateTime, attempts);
    });
}
