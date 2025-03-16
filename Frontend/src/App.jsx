import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import HomePage from './pages/Homepage/HomePage';
import UserPage from './pages/UserPage/UserPage';
import Form from './pages/Insurance_Form/Form';
import Advisor from './pages/Advisor/Advisor';
import FD from './pages/FD/FD';
import Expense from './pages/Expense/Expense';
import SIPs from './pages/SIPs/SIPs';

//import Google_Translate from './Components/Google_Translate.jsx';


function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/insurance" element={<Form/>} />
          <Route path="/advisor" element={<Advisor/>} />
          <Route path="/fd" element={<FD/>} />
          <Route path="/expense" element={<Expense/>} />
          <Route path="/sip" element={<SIPs/>} />

          
        </Routes>
     
    </Router>
  );
}

export default App;
