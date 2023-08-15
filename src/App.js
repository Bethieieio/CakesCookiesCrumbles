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
import { CreateRecipe } from './components/pages/createRecipe';
import { CurrentUserProvider } from './components/context/CurrentUserContext';
import { Navbar } from './components/navbar';
import { SingleRecipe } from './components/pages/singleRecipe';
import { EditRecipe } from './components/pages/editRecipe';

function App() {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <div className="App">
          <header className="App-header">
            <Navbar></Navbar>
          </header>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />}/>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/recipe/create" element={<CreateRecipe/>} />
                <Route path="/recipe/:id" element={<SingleRecipe  />} />
                <Route path="/editrecipe/:id" element={<EditRecipe />} /> 

              </Routes>
        </div>
      </CurrentUserProvider>
    </BrowserRouter>

  );
}

export default App;
