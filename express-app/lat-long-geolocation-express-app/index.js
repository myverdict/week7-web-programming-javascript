// https://www.youtube.com/watch?v=wxbQP1LMZsw&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=9
// By The Coding Train

// Express 4.18.2: Fast, unopinionated, minimalist web framework for Node.js
// Setting up a web server: this file has the express server code

// to have access to the node express web server package, use 'require'
const { request, response } = require('express');
const express = require('express');

// Creates an Express application: use the whole express function libary for the app
// The express() function is a top-level function exported by the express module.
const app = express();

// listen at a port: the server is an application that listens for requests
// http://localhost:3000/
app.listen(3000, () => console.log('listening at 3000'));

// if this line of code is not there, then "Cannot GET /" shows up at port 3000
// therefore, to serve web pages, use express to host static files
// create a 'public' folder in the main package (data-selfie-app-express)
// and put the file 'index.html' in the 'public' folder
app.use(express.static('public'));

// https://expressjs.com/en/5x/api.html#express.json
// parse any data that is received from the client as JSON
app.use(express.json({ limit: '1mb' }));

// https://expressjs.com/en/5x/api.html#app.post.method
// procedure for sending data from client-side to the server
// 1. routing, 2. JSON parsing, 3. Post with fetch()
// POST method route: post(addressPostRecd, callbackFn)
app.post('/api', (request, response) => {
  console.log('I got a request!');
  console.log(request.body);

  const data = request.body;
  // response.end();     // this completes the request
  // another way to complete the request
  response.json({
    status: 'success',
    latitude: data.lat,
    longitude: data.long,
  });
});
