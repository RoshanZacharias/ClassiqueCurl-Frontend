import axios from 'axios';

const logoutapi = async () => {
   
    try {
       
      const response = await axios.post(
        'http://127.0.0.1:8000/logout/'
        
      );
      localStorage.removeItem('access_token');
  
      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error during logout:', error);
    }
  };




export const MenuItems = [
    {
        title: "Home",
        url: '/',
        cName: 'nav-links',
        icon: "fa-solid fa-house"
    },

    {
        title: "Salons",
        url: '/salons',
        cName: 'nav-links',
        icon: "fa-solid fa-scissors"
    },

    {
        title: "Profile",
        url: '/profile',
        cName: 'nav-links',
        icon: "fa-solid fa-user"
    },

    {
        title: "Messages",
        url: '/messages',
        cName: 'nav-links',
        icon: "fa-solid fa-message"
    },

    {
        title: "Bookings",
        url: '/bookings',
        cName: 'nav-links',
        icon: "fa-solid fa-bookmark"
    },

    {
        title: "Sign In",
        url: '/login',
        cName: 'nav-links',
        icon: "fa-solid fa-right-to-bracket"
    },

   
]