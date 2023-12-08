import axios from 'axios';
import { clearAuth } from '../Redux/UserSlice';
import { useDispatch } from 'react-redux';

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/logout/", {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if required
          // 'Authorization': 'Bearer <your-token>',
        },
      });

      if (response.data) {
        console.log("Logout successful");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Logout error", error);
    }

    dispatch(clearAuth());

    // You may add navigation logic here if needed
  };

  return handleLogout;
};

export default useLogout;
