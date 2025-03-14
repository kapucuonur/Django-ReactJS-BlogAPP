import React from 'react';
import APIService from './APIService';

function ArticleList(props) {
    const token = localStorage.getItem('mytoken'); // Get token from local storage

    const editBtn = (article) => {
        props.editBtn(article);
    };

    const deleteBtn = (article) => {
        APIService.DeleteArticle(article.id, token)
            .then(() => props.deleteBtn(article))
            .catch(error => console.log(error));
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            {props.articles && props.articles.map(article => {
                return (
                    <div key={article.id} className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
                        <h1 className="text-2xl font-bold text-gray-800 mb-3">{article.title}</h1>
                        <p className="text-gray-600 leading-relaxed">{article.description}</p>

                        <div className="flex gap-3 mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                onClick={() => editBtn(article)}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                                onClick={() => deleteBtn(article)}
                            >
                                Delete
                            </button>
                        </div>
                        <hr className="my-6 border-gray-200" />
                    </div>
                );
            })}
        </div>
    );
}

export default ArticleList;