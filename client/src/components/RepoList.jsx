import React from 'react';

const RepoList = ({ repos, inserted, removed, sortFork, sortName, getRepos }) => {

  const {useState} = React;

  const [filterSearched, setFilter] = useState('');

  const onChange = (e) => {
    setFilter(e.target.value);
  }


  return (
  <div>
    <h4> Repo List Component </h4>
    <div>Filter List By Word: <input value={filterSearched} onChange={onChange}/></div>
    There are {repos.length} repos. {inserted} repos imported. {removed} repos have been removed.
    <div className="sortButtons">
        <button onClick={sortFork}>Sort By Forks</button>
        <button onClick={sortName}>Sort By Name</button>
        <button onClick={getRepos}>Sort By Recently Added</button>
      </div>
    {repos.filter(repo => repo.repoName.includes(filterSearched)).map((repo)=>(
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
}
export default RepoList;