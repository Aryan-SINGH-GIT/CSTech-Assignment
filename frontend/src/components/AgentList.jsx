import React, { useEffect, useState } from 'react';
import api from '../api';

const AgentList = ({ refreshTrigger }) => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const { data } = await api.get('/agents');
                setAgents(data);
            } catch (error) {
                console.error('Failed to fetch agents', error);
            }
        };
        fetchAgents();
    }, [refreshTrigger]);

    return (
        <div className="card h-full">
            <h3 className="text-xl font-bold mb-4 text-secondary border-b pb-2">Agents List</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Mobile
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent) => (
                            <tr key={agent._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-4 border-b border-gray-100 text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-light text-white flex items-center justify-center font-bold text-xs">
                                            {agent.name.charAt(0)}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap font-medium">{agent.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 border-b border-gray-100 text-sm">
                                    <p className="text-gray-600 whitespace-no-wrap">{agent.email}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-gray-100 text-sm">
                                    <p className="text-gray-600 whitespace-no-wrap">{agent.mobile}</p>
                                </td>
                            </tr>
                        ))}
                        {agents.length === 0 && (
                            <tr>
                                <td colSpan="3" className="px-5 py-8 text-center text-gray-500 text-sm">
                                    No agents found. Add one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentList;
