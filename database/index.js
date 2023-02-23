const mysql = require('mysql2');
const Promise = require('bluebird');
const $ = require('jquery');
const {getReposByUsername} = require('../helpers/github');

db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'RepoList'
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});

let save = (input) => {
  getReposByUsername(input)
  .then((data) => {
    console.log('This is data in database', data);
    // let params =
    // db.query('INSERT INTO repos (user, repoDescription, repoName, repoURL, forks) VALUES (?, ?, ?, ?, ?', params)
  })
}

let getRepos = () => {

}

module.exports.save = save;
