import './App.css';

import Admin from './components/Admin/Admin';
import LoginPage from './components/LoginPage';
import Trainer from './components/Trainer/Trainer';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function App() {
  return (
    <div className="App">

      {/* <LoginPage/> */}
      <Admin/>
     {/* <Trainer/> */}
    
    </div>
  );
}

export default App;
