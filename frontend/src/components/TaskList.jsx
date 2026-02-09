import React, { useEffect, useState } from 'react';
import api from '../api';

const TaskList = ({ refreshTrigger }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await api.get('/tasks');
                setTasks(data);
            } catch (error) {
                console.error('Failed to fetch tasks', error);
            }
        };
        fetchTasks();
    }, [refreshTrigger]);

    return (
        <div className="card mt-6">
            <h3 className="text-xl font-bold mb-4 text-secondary border-b pb-2">Distributed Tasks</h3>
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                <table className="min-w-full leading-normal">
                    <thead className="sticky top-0 bg-white">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                First Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Notes
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Assigned To
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-4 border-b border-gray-100 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap font-medium">{task.firstName}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-gray-100 text-sm">
                                    <p className="text-gray-600 whitespace-no-wrap">{task.phone}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-gray-100 text-sm">
                                    <p className="text-gray-600 whitespace-no-wrap truncate max-w-xs" title={task.notes}>{task.notes}</p>
                                </td>
                                <td className="px-5 py-4 border-b border-gray-100 text-sm">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-white">
                                        {task.assignedTo?.name || 'Unassigned'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {tasks.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-5 py-8 text-center text-gray-500 text-sm">
                                    No tasks distributed yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskList;
