import React, { useState } from 'react';

const Search = ({ onSearch, remove }) => {

  const[term, setTerm] = useState('');

  const onChange = (e) => {
    setTerm(e.target.value);
  }
  const search = () => {
    onSearch(term);
  }

  const deleteTerm = () => {
    remove(term);
  }

  return (
    <div>
      <h4>Add More Repos!</h4>
      Enter a github username: <input value={term} onChange={onChange}/>
      <button onClick={search}> Add Repos </button>
      <button onClick={deleteTerm}> Remove Repos </button>
    </div>
  );
}

export default Search;