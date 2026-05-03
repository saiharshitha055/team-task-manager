import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Added for professional redirection
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        // Using VITE_API_URL configured in Railway
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`, {
          headers: { 'x-auth-token': token } 
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        // If the token is expired or invalid, logout the user
        if (err.response?.status === 401) {
          logout();
          navigate('/');
        }
      }
    };
    fetchTasks();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/'); // Ensure the recruiter goes back to the login screen
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800">Ethara AI Dashboard</h1>
            <p className="text-gray-600">Tracking Project Milestones & Tasks</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-all active:scale-95"
          >
            Logout
          </button>
        </header>

        <div className="grid gap-6">
          {tasks.length > 0 ? (
            tasks.map(task => {
              // FAIL-SAFE LOGIC: Standardizing status check
              const isCompleted = task.status?.toLowerCase() === 'completed';

              return (
                <div key={task._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-all">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                    <p className="text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      isCompleted 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="mb-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No tasks found. Add some in MongoDB to see them here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;