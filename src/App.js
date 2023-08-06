import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './axiosDefaults';

import { Login } from './components/pages/login';
import { Signup } from './components/pages/signup';
import { CurrentUserProvider } from './components/context/CurrentUserContext';

function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />}/>
                <Route path="/" element={<h1>Home</h1>} />
              </Routes>
        </div>
      </CurrentUserProvider>
    </BrowserRouter>

  );
}

export default App;
