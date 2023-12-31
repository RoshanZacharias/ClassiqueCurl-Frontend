import './App.css';
import 'react-toastify/dist/ReactToastify.css';
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
import AddService from './Components/AddService.js';
import AddStylist from './Components/AddStylists.js';
import AddTimeSlot from './Components/AddTimeSlot.js';
import SalonProfile from './Components/Salon/SalonProfile.js';
import SalonDetails from './Components/User/SalonDetails.js';
import BookingOverview from './Components/User/BookingOverview.js';
import SuccessPage from './Components/SuccessMessage.js';
import BookingsPage from './Components/BookingsPage.js';
import SalonBookingsView from './Components/Salon/SalonBookings.js';
import UserProfile from './Components/User/UserProfile.js';
import ChatComponent from './Components/Messages/Message.jsx';
import SalonChatComponent from './Components/Messages/SalonMessage.jsx';
import SalonListing from './Components/User/SalonList.js';
import AdminBookings from './Components/AdminBookings.jsx';
import SalonPage from './Components/Salon/SalonPage.js';
import SearchResultPage from './Components/SearchResultPage.jsx';



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
        <Route path='/salons' element={<SalonListing/>} />
        <Route path='/salon-details/:id' element={<SalonDetails/>} />
        <Route path='/salon-details/:id/booking-overview/:userId/:appointmentId' element={<BookingOverview />} />
        <Route path='/success' element={<SuccessPage/>} />
        <Route path= '/bookings' element={<BookingsPage/>} />
        <Route path='/profile' element={<UserProfile/>} />
        <Route path='/messages' element={<ChatComponent/>} />
        <Route path='/search' element={<SearchResultPage/>} />
        <Route path='/salon-register' element={<SalonRegister/>}/>
        <Route path='/salon-login' element={<SalonLogin/>}/>
        <Route path='/salon-home' element={<SalonHomePage/>}/>
        <Route path='/salon-home/add-service' element={<AddService/>} />
        <Route path='/salon-home/add-stylist' element={<AddStylist/>} />
        <Route path='/salon-home/add-timeslot' element={<AddTimeSlot/>} />
        <Route path='/salon-home/salon-profile' element={<SalonProfile/>} />
        <Route path='/salon-home/salon-bookings' element={<SalonBookingsView/>} />
        <Route path='/salon-home/salon-messages' element={<SalonChatComponent/>} />
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin-home/salon-list' element={<SalonList/>} />
        <Route path='/admin-home/salon-list/salon-request-approval/:salonId' element={<SalonRequestApproval/>} />
        <Route path='/admin-home/user-list' element={<UserList/>} />
        <Route path='/admin-home/bookings' element={<AdminBookings/>} />
        <Route path='admin-home/salons' element={<SalonPage/>} />
      </Routes>
   </Router>
   </div>
  
   

  );
}

export default App;
