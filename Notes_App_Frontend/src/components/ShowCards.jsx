import React from 'react'
import axios from 'axios'

const ShowCards = ({ title, description, onClick, onEdit }) => {

  return (
    <div className='block rounded-lg border mb-10 border-white bg-dark:bg-gray-900 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white'>
      <div className='flex justify-between dark:border-white/10 border-b-2 border-white'>
        <div className='px-6 py-3'>Title: {title}</div>
        <div className='flex'>
          <button
          onClick={onEdit}
           className='text-blue-500 p-2 mt-1 mr-4'>Edit</button>
          <button
           onClick={onClick}
            className='text-blue-500 p-2 mt-1 mr-4'>
            Delete
          </button>
        </div>
      </div>
      <div className='p-6'>
        <blockquote>
          <p className='text-xl'>Description: {description}</p>
        </blockquote>
      </div>
    </div>
  )
}

export default ShowCards
