import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [inserted, setInserted] = useState(0);
  const [removed, setRemoved] = useState(0);

  const search = (term) => {
    $.ajax({
      method: "POST",
      url: "/repos",
      data: JSON.stringify({name: term}),
      contentType: "application/json",
      dataType: "json"
    })
    .then((success)=>{
      setInserted(success.inserted);
      setRemoved(0);
      getRepos();
    })
    .catch((error)=>{console.log('Could not search: ', error)})
  }

  const removeRepos = (term) => {
    $.ajax({
      method: "DELETE",
      url: "/repos",
      data: JSON.stringify({name: term}),
      contentType: "application/json",
      dataType: "json"
    })
    .then((success)=>{
      setRemoved(success.removed);
      setInserted(0);
      getRepos();
    })
    .catch((error)=>{console.log('Could not delete: ', error)})
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

  const sortFork = ()=>{
    setRepos(repos.slice().sort((a, b) => parseFloat(b.forks) - parseFloat(a.forks)));
  }

  const sortName = ()=>{

    function compare( a, b ) {
      if ( a.repoName < b.repoName ){
        return -1;
      }
      if ( a.repoName > b.repoName ){
        return 1;
      }
      return 0;
    }

    setRepos(repos.slice().sort(compare));

  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search} remove={removeRepos}/>
      <RepoList repos={repos} inserted={inserted} removed={removed} sortFork={sortFork} sortName={sortName} getRepos={getRepos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));