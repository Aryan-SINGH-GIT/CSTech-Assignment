import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const UploadCSV = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const { data } = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success(data.message);
            onUploadSuccess();
            setFile(null);
            document.getElementById('fileInput').value = '';
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card mb-6">
            <h3 className="text-xl font-bold mb-4 text-secondary border-b pb-2">Upload Tasks</h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <form onSubmit={handleUpload} className="w-full text-center">
                    <input
                        id="fileInput"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-light file:text-white
                hover:file:bg-primary
                cursor-pointer mb-4"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Processing...' : 'Upload & Distribute'}
                    </button>
                </form>
                <p className="text-xs text-gray-400 mt-2">
                    Supported formats: .csv, .xlsx, .xls (Headers: FirstName, Phone, Notes)
                </p>
            </div>
        </div>
    );
};

export default UploadCSV;
