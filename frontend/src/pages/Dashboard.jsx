import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AgentForm from '../components/AgentForm';
import AgentList from '../components/AgentList';
import UploadCSV from '../components/UploadCSV';
import TaskList from '../components/TaskList';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [refreshAgents, setRefreshAgents] = useState(false);
    const [refreshTasks, setRefreshTasks] = useState(false);

    const triggerAgentRefresh = () => setRefreshAgents((prev) => !prev);
    const triggerTaskRefresh = () => setRefreshTasks((prev) => !prev);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-2xl font-bold text-primary">CSTech</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-sm text-gray-500 text-right hidden sm:block">
                                <p>Logged in as</p>
                                <p className="font-medium text-gray-800">{user?.email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="bg-white text-gray-500 hover:text-red-500 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:border-red-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-secondary">Dashboard Overview</h2>
                    <p className="text-gray-500 mt-1">Manage agents and distribute incoming tasks.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Left Column: Input Forms */}
                    <div className="xl:col-span-5 space-y-8">
                        <AgentForm onAgentAdded={triggerAgentRefresh} />
                        <UploadCSV onUploadSuccess={triggerTaskRefresh} />
                    </div>

                    {/* Right Column: Data Display */}
                    <div className="xl:col-span-7 space-y-8">
                        <div>
                            <AgentList refreshTrigger={refreshAgents} />
                        </div>
                        <div className="block">
                            <TaskList refreshTrigger={refreshTasks} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
