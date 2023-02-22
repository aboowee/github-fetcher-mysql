const mysql = require('mysql2');
const Promise = require('bluebird');

db = mysql.createConnection({
  host: 'localhost'
  user: 'root',
  database: 'RepoList'
})

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});

let save = (input) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

let getRepos = () => {

}

module.exports.db = db;