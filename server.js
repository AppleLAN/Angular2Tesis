//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));
app.use(function(req, res) {
  res.sendfile(__dirname + '/dist/index.html');
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
