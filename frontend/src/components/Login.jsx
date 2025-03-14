import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from './APIService';

function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setLogin] = useState(true);
    const [error, setError] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('mytoken');
        if (token) {
            navigate('/articles');
        }
    }, [navigate]);

    const loginBtn = () => {
        if (username.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill in all fields.');
            return;
        }
        APIService.LoginUser({ username, password })
            .then(resp => {
                localStorage.setItem('mytoken', resp.token);
                navigate('/articles');
            })
            .catch(error => {
                setError('Invalid username or password.');
                console.log(error);
            });
    };

    const RegisterBtn = () => {
        if (username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            setError('Please fill in all fields.');
            return;
        }
        APIService.RegisterUser({ username, email, password })
            .then(() => loginBtn())
            .catch(error => {
                setError('Registration failed. Please try again.');
                console.log(error);
            });
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/img/10.jpg')" }}
        >
            <div className="bg-white bg-opacity-40 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome to Blog</h1>
                <div className="space-y-4">
                    {isLogin ? (
                        <h3 className="text-xl font-semibold text-gray-700 text-center">Please Login Here</h3>
                    ) : (
                        <h3 className="text-xl font-semibold text-gray-700 text-center">Please Register Here</h3>
                    )}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Username"
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    {!isLogin && (
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter Email"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4">
                        {isLogin ? (
                            <div>
                                <button
                                    onClick={loginBtn}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Login
                                </button>
                                <p className="text-center text-gray-600 mt-2">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => setLogin(false)}
                                        className="text-blue-500 font-semibold hover:underline"
                                    >
                                        Register
                                    </button>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={RegisterBtn}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Register
                                </button>
                                <p className="text-center text-gray-600 mt-2">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setLogin(true)}
                                        className="text-blue-500 font-semibold hover:underline"
                                    >
                                        Login
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;