import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login Successful! Ready to see the Dashboard.");
      navigate('/dashboard');
    } catch (err) {
      alert("Error: Connection failed. Please ensure the backend is active.");
    }
  };

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    
    // Replace with your actual MongoDB test credentials
    const guestEmail = "harshitha@test.com"; 
    const guestPassword = "$2b$10$cOSKp3lgxO8aQJFx9i.2PuQiTspFEv0bB/VdFPSlKr2NjoxSbFu1O"; 

    try {
      await login(guestEmail, guestPassword);
      alert("Logged in as Guest!");
      navigate('/dashboard');
    } catch (err) {
      console.error("Guest login failed:", err);
      alert("Guest login failed. Please check backend connection.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Ethara AI Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
          >
            Sign In
          </button>

          <div className="relative flex py-4 items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink mx-4 text-gray-400 text-xs uppercase font-semibold">OR</span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          {/* --- GUEST LOGIN BUTTON --- */}
          <button 
            onClick={handleGuestLogin}
            type="button"
            className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Explore as Guest
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;