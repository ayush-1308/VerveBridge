import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    console.log('Logged out')
    navigate('/')
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const query = searchTerm;
        const response = await axios.get(`http://localhost:5000/api/note/notes/search?query=${query}`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        });
        setSearchResults(response.data.notes);
        console.log(response);
        navigate('/search', { state: { searchResults: response.data.notes } })
    } catch (error) {
        console.error('Error searching notes:', error);
    }
};

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <nav className='bg-white border-gray-200 dark:bg-gray-900'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4'>
          <div className='flex items-center space-x-3 rtl:space-x-reverse'>
            <button
            onClick={() => navigate('/dashboard')}
            className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              VerveBridge
            </button>
          </div>

          <form
          onSubmit={handleSearch}
          className='max-w-md mx-auto'>
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                onChange={handleSearchChange}
                className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search'
                required
              />
              <button
                type='submit'
                className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Search
              </button>
            </div>
          </form>

          <div className='flex items-center space-x-6 rtl:space-x-reverse'>
            <button
              onClick={() => navigate('/create-note')}
              className='text-sm  text-gray-500 dark:text-white hover:underline cursor-pointer'
            >
              Create Note
            </button>
            <button
              onClick={logout}
              className='text-sm  text-blue-600 dark:text-blue-500 hover:underline cursor-pointer'
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
