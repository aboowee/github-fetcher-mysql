import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    $.ajax({
      method: "POST",
      url: "/repos",
      data: JSON.stringify({name: term}),
      contentType: "application/json"
    })
    .then((success)=>{getRepos()})
    .catch((error)=>{console.log('Could not search: ', error)})
  }

  const getRepos = () => {
    $.ajax({
      method: "GET",
      url: "/repos",
      dataType: "json"
    })
    .then((data)=>{
      setRepos(data);
    })
    .catch((error)=>{
      console.log('Could not get data: ', error);
    })
  }

  useEffect(()=>{
    getRepos();
  }, []);

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));