import logo from './logo.svg';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Bucket from './components/Bucket';
import History from './components/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/bucket/:id" element = {<Bucket />}/>
        <Route exact path = "/history" element = {<History />} />
        <Route exact path = "/" element = {<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
