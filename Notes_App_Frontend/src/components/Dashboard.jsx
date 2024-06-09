import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ShowCards from './ShowCards'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/note/notes',
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }
        )
        setNotes(response.data)
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }

    fetchNotes()
  }, [])


  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/api/note/notes/${id}`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        setNotes(notes.filter(note => note._id !== id));
        console.log('Note deleted successfully')
    } catch (error) {
        console.error('Error deleting note:', error);
    }
};

const handleEdit = async (id) => { 
  console.log(id)
  try {
    localStorage.setItem('noteId', id)
    const res = await axios.put(`http://localhost:3000/api/note/notes/edit/${id}`, {}, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
    });
    const data = res.data;
    navigate('/edit-note')

  } catch (error) {
    console.error('Error editing note:', error);
  }
}

  return (
    <>
      <Navbar 
      />
      <div className='flex justify-center m-5'>
      <h1 className='text-white font-bold text-4xl'>Your Notes</h1>
      </div>
      <div className='mt-5 mb-10 ml-32 mr-32'>
        <div>
          {notes.map((note, index) => (
            <ShowCards
              key={index}
              title={note.title}
              description={note.description}
              onClick={() => handleDelete(note._id)}
              onEdit={() => handleEdit(note._id)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard
