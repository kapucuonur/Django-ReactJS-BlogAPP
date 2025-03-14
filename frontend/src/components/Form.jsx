import React, { useState, useEffect } from 'react';
import APIService from './APIService';
import { useNavigate } from 'react-router-dom'; // For navigation after logout

function Form(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('mytoken'); // Get token from local storage
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        console.log('Article props:', props.article); // Debugging
        if (props.article) {
            setTitle(props.article.title);
            setDescription(props.article.description);
        }
    }, [props.article]);

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, { title, description }, token)
            .then(resp => props.updatedInformation(resp));
        setTitle('');
        setDescription('');
    };

    const insertArticle = () => {
        APIService.InsertArticle({ title, description }, token)
            .then(resp => props.insertedInformation(resp));
        setTitle('');
        setDescription('');
    };

    const logout = () => {
        localStorage.removeItem('mytoken');
        navigate('/login'); // Redirect to login page or home after logout
    };

    return (
        <div className="max-w-2xl mx-auto p-5">
            {props.article ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                            placeholder="Enter Post Title"
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea
                            value={description}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                            placeholder="Enter Post Description"
                            rows="5"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        {props.article.id ? (
                            <button
                                onClick={updateArticle}
                                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-300 text-lg font-semibold"
                            >
                                Update Post
                            </button>
                        ) : (
                            <button
                                onClick={insertArticle}
                                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 text-lg font-semibold"
                            >
                                Create Post
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                            placeholder="Enter Post Title"
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea
                            value={description}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
                            placeholder="Enter Post Description"
                            rows="5"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={insertArticle}
                            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 text-lg font-semibold"
                        >
                            Create Post
                        </button>
                    </div>
                </div>
            )}

{/* <div className="flex justify-end mt-6">
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                    Logout
                </button>
            </div> */}
        </div>
    );
}

export default Form;
