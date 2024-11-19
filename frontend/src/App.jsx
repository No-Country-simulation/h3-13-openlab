import Header from './components/Header'
import Rutas from './components/Rutas';
import './css/App.css'
import { BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Rutas />
        </div>
      </Router>
    </>
  );
}

export default App;
