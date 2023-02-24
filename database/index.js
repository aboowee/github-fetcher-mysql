const mysql = require('mysql2');
const $ = require('jquery');
const {getReposByUsername} = require('../helpers/github');
const BlueBirdPromise = require('bluebird');

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
  return getReposByUsername(input)
  .then((data) => {
    let insertQueue = data.data.map(currentRepo => {
      return new Promise((resolve, reject) => {
        db.query('INSERT IGNORE INTO repos (user, repoDescription, repoName, repoURL, forks) VALUES (?, ?, ?, ?, ?)', [currentRepo.owner.login, currentRepo.description, currentRepo.name, currentRepo.html_url, currentRepo.forks], (err, result)=>{
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      })
      return Promise.all(insertQueue);
    })
  })
  .catch(err => {
    console.log(err);
  })
}

let getRepos = () => {
  return new Promise((resolve, reject) => {db.query('SELECT * FROM repos ORDER BY forks DESC LIMIT 25', (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  })})
}

module.exports.save = save;
module.exports.getRepos = getRepos;