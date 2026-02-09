import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AgentForm = ({ onAgentAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value) => {
        setFormData({ ...formData, mobile: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/agents', formData);
            toast.success('Agent added successfully');
            setFormData({ name: '', email: '', mobile: '', password: '' });
            onAgentAdded();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add agent');
        }
    };

    return (
        <div className="card mb-6">
            <h3 className="text-xl font-bold mb-4 text-secondary border-b pb-2">Add New Agent</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                    <PhoneInput
                        country={'us'}
                        value={formData.mobile}
                        onChange={handlePhoneChange}
                        inputClass="!w-full !pl-12 !pr-4 !py-2 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-primary !focus:border-transparent !transition-all !duration-200"
                        containerClass="!w-full"
                        buttonClass="!border !border-gray-300 !rounded-l-lg !bg-gray-50 !hover:bg-gray-100"
                    />
                </div>
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Secret123"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="input-field pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-primary focus:outline-none"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className="md:col-span-2 mt-2">
                    <button
                        type="submit"
                        className="btn-primary w-full md:w-auto"
                    >
                        Add Agent
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgentForm;
