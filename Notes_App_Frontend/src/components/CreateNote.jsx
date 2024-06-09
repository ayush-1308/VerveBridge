import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(formData);
      const res = await axios.post('http://localhost:5000/api/note/create', formData, {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
      });
      const data = res.data;
      console.log(data);
      if (data.success) {
        setFormData({ title: '', description: '' });
        console.log('Note created successfully');
        navigate('/dashboard')
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('An error occurred while creating the note', error);
    }
  };

  return (
    <>
    <Navbar />
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create a Note</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Note
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default CreateNote;
