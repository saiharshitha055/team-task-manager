import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useContext(AuthContext);

  // If the user is logged in (token exists), show Dashboard. 
  // Otherwise, stay on the Login page.
  return user ? <Dashboard /> : <Login />;
}

export default App;