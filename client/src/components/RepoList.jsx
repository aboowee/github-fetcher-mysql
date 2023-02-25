import React from 'react';

const RepoList = ({ repos, inserted }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos. {inserted} repos imported.
    {repos.map((repo)=>(
      <div className='repoContainer' key={repo.id}>
        <div id='repoName'>{repo.repoName.toUpperCase()}</div>
        <div id='user'>Created By: <a href={repo.userURL}>{repo.user.toUpperCase()}</a></div>
        <div>Link to Repo: <a href={repo.repoURL}>{repo.repoURL}</a></div>
        <div>Repository Description: {repo.repoDescription}</div>
        <div>Number of Forks: {repo.forks}</div>
      </div>
    ))}
  </div>
)

export default RepoList;