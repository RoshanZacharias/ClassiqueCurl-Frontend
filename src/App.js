import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import UserRegister from './Pages/UserRegister/UserRegister.js';
import UserLogin from './Pages/UserLogin/UserLogin.js';
import SalonRegister from './Pages/SalonRegister/SalonRegister.js';
import SalonLogin from './Pages/SalonLogin/SalonLogin.js';
import UserHomePage from './Pages/UserHomePage.js';
import AdminLogin from './Pages/AdminLogin/AdminLogin.js';
import AdminHomePage from './Pages/AdminHomePage.js';
import SalonList from './Components/Salon/SalonList.js';
import UserList from './Components/User/UserList.js';
import SalonRequestApproval from './Components/Salon/SalonRequestApproval.js';
import SalonHomePage from './Pages/SalonHomePage.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
   <div>
   <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    />
     <Router>
      <Routes>
        <Route path='/' element={<UserHomePage/>} />
        <Route path='/admin-home' element={<AdminHomePage/>} />
        <Route path='/signup' element={<UserRegister/>}></Route>
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/salon-register' element={<SalonRegister/>}/>
        <Route path='/salon-login' element={<SalonLogin/>}/>
        <Route path='/salon-home' element={<SalonHomePage/>}/>
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin-home/salon-list' element={<SalonList/>} />
        <Route path='/admin-home/salon-list/salon-request-approval/:salonId' element={<SalonRequestApproval/>} />
        <Route path='/admin-home/user-list' element={<UserList/>} />
      </Routes>
   </Router>
   </div>
  
   

  );
}

export default App;
