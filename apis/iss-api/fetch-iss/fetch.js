// API documentation: https://wheretheiss.at/w/developer

// ISS API URL
let url = "https://api.wheretheiss.at/v1/satellites/25544";

// find the iss lat & long paras in the html page
let issLat = document.querySelector("#iss-lat");
let issLong = document.querySelector("#iss-long");

// use the fetch method call to the api url: fetch returns a promise
// res.json also returns a promise & that allows to attach another 'then'
fetch(url)
  .then((res) => {
    return res.json(); // process response into json
  })
  .then((issData) => {
    // process the json
    console.log(issData); // display data in the browser's console

    // get the lat & long values from json properties of issData
    let lat = issData.latitude;
    let long = issData.longitude;

    // display lat & long data on the web page
    issLat.innerHTML = lat;
    issLong.innerHTML = long;
  })
  .catch((err) => {
    console.log("ERROR!", err);
  });

// minimilist way of writing the above code
// fetch(url)
//   .then((res) => res.json()) // 'return' keyword not required
//   .then((issData) => {
//     console.log(issData);
//     let lat = issData.latitude;
//     let long = issData.longitude;
//     issLat.innerHTML = lat;
//     issLong.innerHTML = long;
//   })
//   .catch((err) => console.log("ERROR", err));
