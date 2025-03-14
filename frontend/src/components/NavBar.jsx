import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();

    const logoutBtn = () => {
        localStorage.removeItem('mytoken'); // Remove token from local storage
        navigate('/'); // Redirect to login page
    };

    return (
        <div>
            <nav className="bg-gray-800 text-white p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="#" className="text-2xl font-bold">WelCome to Blog</a>
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={logoutBtn} 
                            className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-300"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
