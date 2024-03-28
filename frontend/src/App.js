import './App.css';
import Navbar from './layouts/Navbar';
import Main from './layouts/Main';
import Drawer from './layouts/Drawer';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();
  console.log("USER STATE: ",user);
  return (
    <div className="App">
      <Navbar/>
      <Drawer/>
      <Main/>
    </div>
  );
}

export default App;
