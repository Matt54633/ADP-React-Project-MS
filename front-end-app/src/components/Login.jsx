import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Both username and password are required.');
            return;
        }

        try {
            await login(username, password);
            navigate('/');
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <>
            <div className='flex items-center justify-center h-[100vh]'>
                <form onSubmit={handleLogin} className="flex ring-1 shadow-md ring-gray-300 w-96 rounded-xl p-4 flex-col items-center justify-center gap-3">
                    <h1 className='text-2xl font-bold text-slate-700'>Customer Portal</h1>
                    <input
                        type="text"
                        className="text-sm hover:outline-none active:outline-none p-2 shadow-md outline-none bg-white hover:bg-gray-100 transition-colors ring-1 ring-gray-300 text-slate-700 flex items-center justify-center w-full h-8 rounded-lg"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="text-sm hover:outline-none active:outline-none p-2 shadow-md outline-none bg-white hover:bg-gray-100 transition-colors ring-1 ring-gray-300 text-slate-700 flex items-center justify-center w-full h-8 rounded-lg"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={`flex gap-2 items-center px-2 ring-1 w-full rounded-lg ring-red-300 h-7 transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 size-4">
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                        </svg>

                        <p className="text-red-500 text-xs">{error}</p>
                    </div>

                    <button type="submit" className="cursor-pointer w-full bg-blue-400 ring-1 ring-blue-300 shadow-md transition-colors hover:bg-blue-500 text-sm px-4 h-9 rounded-lg">Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;
