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

  return (getReposByUsername(input)
  .then((data) => {
    let insertQueue = data.data.map(currentRepo => {
      return new Promise((resolve, reject) => {
        db.query('INSERT IGNORE INTO repos (user, repoDescription, repoName, repoURL, forks, userURL) VALUES (?, ?, ?, ?, ?, ?)', [currentRepo.owner.login, currentRepo.description, currentRepo.name.toUpperCase(), currentRepo.html_url, currentRepo.forks, currentRepo.owner.html_url], (err, result)=>{
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      })
    })
    return Promise.all(insertQueue);
  })
  .catch(err => {
    console.log(err);
  }))
}

let removeRepos = (input) => {
  return new Promise((resolve, reject) => {db.query(`DELETE FROM repos WHERE user = "${input}"`, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  })})
}

let getRepos = () => {
  return new Promise((resolve, reject) => {db.query('SELECT * FROM repos ORDER BY id DESC', (err, result) => { //ORDER BY forks DESC
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  })})
}

module.exports.save = save;
module.exports.getRepos = getRepos;
module.exports.removeRepos = removeRepos;