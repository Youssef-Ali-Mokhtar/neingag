import './App.css';
import Navbar from './layouts/Navbar';
import Main from './layouts/Main';
import Drawer from './layouts/Drawer';

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Drawer/>
      <Main/>
    </div>
  );
}

export default App;
