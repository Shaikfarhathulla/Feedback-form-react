import './App.css';
import Home from './Components/Home';
 import { Routes,Route } from 'react-router-dom';
import Login from './Components/Login.jsx';
import FeedbackForm from './Components/FeedbackForm.jsx';
import Admin from './Components/Admin.jsx';
function App() {
  return (
    <div className="App">
      
<Routes>
  <Route path='/'element={<Home/>}></Route>
  <Route path='/login'element={<Login/>}></Route>
  <Route path='/feedback'element={<FeedbackForm/>}></Route>
  <Route path='/admin'element={<Admin/>}></Route>

</Routes>
   
    </div>
  );
}

export default App;
