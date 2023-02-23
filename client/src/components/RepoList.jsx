import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map((repo)=>(
      <div>hi</div>
    ))}
  </div>
)

export default RepoList;