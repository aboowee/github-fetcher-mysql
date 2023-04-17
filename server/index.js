const express = require('express');
const path = require('path');
const {save: save} = require('../database/index');
const {getRepos: getRepos} = require('../database/index');
const {removeRepos: removeRepos} = require('../database/index');

let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static(path.join(__dirname,'../client/dist')))
app.use(express.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  save(req.body.name)
  .then((data)=>{
    res.send(JSON.stringify({inserted: data.length}));
    // res.sendStatus(200);
  })
  .catch((error)=>{
    res.sendStatus(500);
  })

  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  getRepos()
  .then(data => { res.send(data)})
  .catch(error => { res.sendStatus(404)})
});

app.delete('/repos', function (req, res) {
  removeRepos(req.body.name)
  .then((data)=>{
    res.send(JSON.stringify({removed: data.affectedRows}));
  })
  .catch((error)=>{
    res.sendStatus(500);
  })
})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

