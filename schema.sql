CREATE DATABASE RepoList;

USE RepoList;

CREATE TABLE Repos (
  id INT NOT NULL AUTO_INCREMENT,
  user VARCHAR(255) NOT NULL,
  repoDescription VARCHAR(500) NULL,
  repoName VARCHAR (255) NOT NULL,
  repoURL VARCHAR(255) NOT NULL UNIQUE,
  forks INT NULL,
  PRIMARY KEY (id)
);
