import React from 'react'
import Navbar from './Navbar'
import ShowCards from './ShowCards'
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
    const location = useLocation();
    const searchResults = location.state ? location.state.searchResults : [];
  return (
    <div>
      <Navbar />
      <div>
        <h1 className='flex justify-center mt-5 text-white font-bold text-4xl'>Search Results</h1>
      </div>
       <div className='mt-5 ml-32 mr-32 mb-10'>
        <div>
          {searchResults.map((note, index) => (
            <ShowCards
              key={index}
              title={note.title}
              description={note.description}
              id={note._id}
            />
          ))}
        </div>
       </div>
    </div>
  )
}

export default SearchResult
