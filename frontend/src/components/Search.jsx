import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search({setList, label, setSearchedTerm}) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
      const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode fazer a busca no banco de dados usando o searchTerm
        console.log('Searching for:', searchTerm);
        if (searchTerm != '') {
          fetch(`http://localhost:3000/api/${label}/search/${searchTerm == '' ? "" : searchTerm}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setSearchedTerm(data);
            
            })
            .catch(error => {
              console.error('Error:', error);
            });
        } else setSearchedTerm('');
      };

  return (
    <div className="w-full m-1 bg-white rounded-lg text-black">
     <form onSubmit={handleSearchSubmit} className="flex items-center m-1">
     <FontAwesomeIcon icon={faSearch} className=" ml-2 px-2" />
        <input
          className="flex-grow rounded-lg border-2 border-none focus:outline-none focus:ring-0 p-2 mr-2"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={`Insert the ${label} name`}
        />
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
