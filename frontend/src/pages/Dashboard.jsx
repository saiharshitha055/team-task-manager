import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        // Using 'x-auth-token' which we verified works with your backend
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
          headers: { 'x-auth-token': token } 
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800">Ethara AI Dashboard</h1>
            <p className="text-gray-600">Tracking Project Milestones & Tasks</p>
          </div>
          <button 
            onClick={logout} 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold shadow-md transition"
          >
            Logout
          </button>
        </header>

        <div className="grid gap-6">
          {tasks.length > 0 ? (
            tasks.map(task => {
              // FAIL-SAFE LOGIC: Check if the status is any version of 'completed'
              const isCompleted = task.status?.toLowerCase() === 'completed';

              return (
                <div key={task._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                    <p className="text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      isCompleted 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No tasks found. Add some in MongoDB to see them here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;