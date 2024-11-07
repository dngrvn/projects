import './App.css';
import SignUp from './components/auth/SignUp';
import SignIp from './components/auth/SignIn';
import AuthDetails from './components/auth/AuthDetails';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
<Sidebar/>

      <SignUp />
      <SignIp />
      <AuthDetails />
    </div>
  );
}

export default App;
