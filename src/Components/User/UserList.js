import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';



const UserList = () => {
    const [users, setUsers] = useState([]);

    const handleViewClick = (userId) => {
        console.log(`View button clicked for Salon ID ${userId}`);
      };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/admin-side/user-list/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);


    const handleBlockUnblock = async (userId, isBlocked) => {
        try {
          const url = `http://127.0.0.1:8000/admin-side/users/${userId}/${isBlocked ? 'unblock' : 'block'}/`;
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error(`Failed to ${isBlocked ? 'unblock' : 'block'} user.`);
          }
      
          
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              if (user.id === userId) {
                return { ...user, is_blocked: !isBlocked };
              }
              return user;
            });
          });
      
      
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      
      

    return (
        <div>
          <AdminNavbar/>
            <h1>User List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                        {/* Add other fields as needed */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>
                            <Button
                                variant={user.is_blocked ? 'success' : 'danger'}
                                onClick={() => handleBlockUnblock(user.id, user.is_blocked)}
                                >
                                {user.is_blocked ? 'Unblock' : 'Block'}
                                </Button>


                            </td>
                            {/* Add other fields as needed */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;
