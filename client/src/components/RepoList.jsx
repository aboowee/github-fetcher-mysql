import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map((repo)=>(
      <div className='repoContainer' key={repo.id}>
        <div>{repo.user}</div>
        <div>{repo.repoName}</div>
        <a href={repo.repoURL}>{repo.repoURL}</a>
        <div>{repo.repoDescription}</div>
        <div>{repo.forks}</div>
      </div>
    ))}
  </div>
)

export default RepoList;