import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-gradient-to-br from-blue-50 to-white">
            <div className="card w-full max-w-md shadow-lg border-t-4 border-primary">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary tracking-tight">CSTech</h1>
                    <p className="text-gray-500 mt-2 text-sm">Admin Dashboard Access</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="admin@csquaretech.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full btn-primary text-lg"
                    >
                        Sign In
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;
